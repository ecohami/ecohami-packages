// @ts-check

// External
import { spawn } from "node:child_process";
import path from "node:path";
import { Separator, select } from "@inquirer/prompts";
import chalk from "chalk";
import shell from "shelljs";

// Internal
import { getStatus } from "./utils/network.mjs";

/**
 * Get the maximum length of the service names.
 * @param {Array} services - The list of services.
 * @returns {number} - The maximum length of the service names.
 */
function getMaxNameLength(services) {
	return Math.max(...services.map((service) => service.name.length));
}

/**
 * Generate choices for the service selection prompt.
 * @param {Array} services - The list of services.
 * @returns {Array} - The choices array for the select prompt.
 */
function generateChoices(services) {
	const choices = [];

	const groupedServices = {
		packages: services.filter((service) => service.type === "packages"),
		services: services.filter((service) => service.type === "services"),
		tools: services.filter((service) => service.type === "tools"),
	};

	const maxNameLength = getMaxNameLength(services) + 4;
	let index = 1;

	// Add each group to choices using the helper method
	if (groupedServices.packages.length > 0) {
		index = addGroupToChoices({
			choices,
			servicesGroup: groupedServices.packages,
			sectionTitle: "Packages",
			index,
			maxNameLength,
		});
	}
	if (groupedServices.services.length > 0) {
		index = addGroupToChoices({
			choices,
			servicesGroup: groupedServices.services,
			sectionTitle: "Services",
			index,
			maxNameLength,
		});
	}
	if (groupedServices.tools.length > 0) {
		index = addGroupToChoices({
			choices,
			servicesGroup: groupedServices.tools,
			sectionTitle: "Tools",
			index,
			maxNameLength,
		});
	}

	// Add a "Quit" option
	choices.push({
		name: "Quit",
		value: "quit",
	});

	return choices;
}

/**
 * Helper method to add grouped services to choices.
 * @param {GroupParams} params - The parameters for adding a group of services to the choices.
 * @returns {number} - The updated index after adding the group of services.
 */
function addGroupToChoices(params) {
	const { choices, servicesGroup, sectionTitle, maxNameLength } = params;

	if (servicesGroup.length > 0) {
		choices.push(new Separator(`--- ${sectionTitle} ---`));
		for (const service of servicesGroup) {
			choices.push({
				name: `${params.index}. ${service.name.padEnd(maxNameLength)}\t${service.command.padEnd(8)}\tPORT: ${service.port ?? "-\t"}\tSTATUS: ${getStatus(service.status)} `,
				value: service,
			});
			params.index++;
		}
	}
	return params.index;
}

/**
 * Prompt the user to select a service from the list.
 * @param {Array} services - The list of services to display and manage.
 * @returns {Promise<Object>} - The selected service object.
 */
async function promptServiceSelection(services) {
	const choices = generateChoices(services);

	const selectedService = await select({
		message: "Select a service:",
		choices: choices,
		pageSize: services.length + 4,
	});

	if (selectedService === "quit") {
		console.log("Exiting...");
		process.exit(0);
	}

	return selectedService;
}

/**
 * Execute the selected command in the given service directory.
 * @param {string} command - The command to execute.
 * @param {string} servicePath - The path to the service directory.
 */
function executeCommand(command, servicePath) {
	const commandToRun = `make ${command}`;

	const runInBackground = commandToRun.includes("docker");

	console.log(
		`Executing: ${commandToRun} in ${servicePath}, runInBackground: ${runInBackground}`,
	);

	const fullPath = path.join("../..", servicePath);
	shell.cd(fullPath);

	if (runInBackground) {
		// Run Docker command in detached mode (background)
		const [cmd, ...args] = commandToRun.split(" ");
		const child = spawn(cmd, args, {
			detached: true,
			cwd: fullPath,
			stdio: "ignore", // Ignore input/output to detach
		});

		child.unref();
		console.log("Docker command is running in the background.");
	} else {
		// Run Local command normally (foreground)
		const result = shell.exec(commandToRun);
		if (result.code !== 0) {
			console.error("Error: Command execution failed.");
		}
	}
}

/**
 * Load services and handle command selection and execution.
 * @param {Array} services - The list of services to display and manage.
 */
async function load(services) {
	const selectedService = await promptServiceSelection(services);
	const { name, command, path, status } = selectedService;

	console.log(`You selected: ${name}, command: ${command}, status: ${status}`);
	if (status) {
		console.log(chalk.yellow("Service is already running."));
		return;
	}

	executeCommand(command, path);
}

export {
	load,
	executeCommand,
	promptServiceSelection,
	generateChoices,
	getMaxNameLength,
};
