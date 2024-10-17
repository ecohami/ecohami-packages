// Internal
import { load } from "./command.mjs";
import { loadConfig } from "./config.mjs";

export class CLI {
	async main() {
		const services = await loadConfig();
		await load(services);
	}
}
