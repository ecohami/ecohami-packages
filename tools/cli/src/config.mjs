// @ts-check

// External
import * as fs from "node:fs/promises";
import path from "node:path";

// Internal
import { DIRECTORIES_TO_CHECK } from "./constants.mjs";
import { fileExists } from "./utils/file.mjs";
import { checkPortUp } from "./utils/network.mjs";

const rootDir = path.resolve(process.cwd(), "../../");

/**
 * Function to parse the `.env` or `.env.example` file and extract the `PORT` value
 * @param {string} servicePath - Path to the service directory
 * @returns {Promise<{ envFileUsed: string | null, port: number | null }>}
 */
async function parseEnvFile(servicePath) {
	const envFilePath = path.join(servicePath, ".env");
	const envExampleFilePath = path.join(servicePath, ".env.example");

	let envFileUsed = null;
	let port = null;

	// Check if .env exists; if not, fallback to .env.example
	if (await fileExists(envFilePath)) {
		envFileUsed = ".env";
	} else if (await fileExists(envExampleFilePath)) {
		envFileUsed = ".env.example";
	}

	if (envFileUsed) {
		const envFileContent = await fs.readFile(
			path.join(servicePath, envFileUsed),
			"utf-8",
		);

		// Look for PORT in the env file content
		const portMatch = envFileContent.match(/^PORT=(\d+)$/m);
		if (portMatch) {
			port = Number.parseInt(portMatch[1], 10);
		}
	}

	return {
		envFileUsed,
		port,
	};
}

/**
 * Function to parse the Makefile and extract SERVICE, CLI commands, and all other commands
 * @param {string} makefilePath - Path to the Makefile
 * @returns {Promise<{ serviceName: string | null, cliCommands: string[], allCommands: string[] }>}
 */
async function parseMakefile(makefilePath) {
	const makefileContent = await fs.readFile(makefilePath, "utf-8");

	// Extract the SERVICE name (like SERVICE := Ecohami CLI)
	const serviceMatch = makefileContent.match(/SERVICE\s*:=\s*(.*)/);
	const serviceName = serviceMatch ? serviceMatch[1].trim() : null;

	// Extract CLI commands defined in the CLI_CMDS variable
	const cliCmdsMatch = makefileContent.match(/CLI_CMDS\s*:=\s*(.*)/);
	const cliCommands = cliCmdsMatch
		? cliCmdsMatch[1].split(/\s+/).filter(Boolean)
		: [];

	// Extract all targets (commands) defined in the Makefile (targets are before the ':')
	const allCommandMatches = [
		...makefileContent.matchAll(/^\.PHONY:\s*(\S+)/gm),
	];
	const allCommands = allCommandMatches.map((match) => match[1]);

	return {
		serviceName,
		cliCommands,
		allCommands,
	};
}

/**
 * Main function to generate the services array
 * @returns {Promise<Service[]>}
 */
async function generateServices() {
	const services = [];

	for (const directory of DIRECTORIES_TO_CHECK) {
		const fullDirPath = path.join(rootDir, directory);

		const directoryExists = await fileExists(fullDirPath);
		if (!directoryExists) {
			console.warn(`Directory does not exist: ${fullDirPath}`);
			continue; // Skip to the next directory
		}

		// Use the directory-to-type mapping to get the service type
		const type = directory;

		// Get all subdirectories in the current directory
		const subdirs = await fs.readdir(fullDirPath, { withFileTypes: true });
		for (const subdir of subdirs) {
			if (subdir.isDirectory()) {
				const servicePath = path.join(fullDirPath, subdir.name);
				const makefilePath = path.join(servicePath, "Makefile");

				// Check if Makefile exists
				if (await fileExists(makefilePath)) {
					const { serviceName, cliCommands } =
						await parseMakefile(makefilePath);
					const { envFileUsed, port } = await parseEnvFile(servicePath);

					for (const command of cliCommands) {
						const status = await checkPortUp(port);

						services.push({
							name: serviceName,
							value: subdir.name,
							path: `./${directory}/${subdir.name}`,
							type,
							command,
							env: envFileUsed || null,
							port: port,
							status,
						});
					}
				}
			}
		}
	}

	return services;
}

/**
 * Load the configuration and generate services
 * @returns {Promise<Service[]>}
 */
async function loadConfig() {
	try {
		const services = await generateServices();
		return services;
	} catch (err) {
		console.error("Failed to generate services:", err);
		process.exit(1);
	}
}

export { loadConfig, generateServices, parseEnvFile, parseMakefile };
