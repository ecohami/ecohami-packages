/**
 * @typedef {Object} Service
 * @property {string|null} name - The name of the service (extracted from Makefile)
 * @property {string} value - The folder name (e.g., 'api', 'webapp')
 * @property {string} path - Path to the service (e.g., './packages/api')
 * @property {string} type - The type of the service ('package', 'service', or 'tool')
 * @property {string|null} command - The command used to start for development (e.g., 'make dev')
 * @property {string|null} env - The env file used (e.g., '.env' or '.env.example')
 * @property {number|null} port - Port number or null if not found
 * @property {string|null} status - Status of the service ('up', 'down')
 */

/**
 * Struct-like object for adding groups to choices.
 * @typedef {Object} GroupParams
 * @property {Array} choices - The choices array for the select prompt.
 * @property {Array} servicesGroup - The group of services (packages, services, tools).
 * @property {string} sectionTitle - The section title (e.g., 'Packages', 'Services', 'Tools').
 * @property {number} index - The current index for numbering the services.
 * @property {number} maxNameLength - The max length of service names for alignment.
 */
