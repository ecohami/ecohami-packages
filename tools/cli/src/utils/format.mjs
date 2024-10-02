/**
 * Function to transform a hyphenated string into a capitalized format.
 * For example, "ecohami-cli" becomes "Ecohami Cli".
 * @param {string} str - The input string to transform.
 * @returns {string} - The transformed string.
 */
export function formatName(str) {
  return str
    .split('-')               // Split the string by hyphen
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()) // Capitalize first letter of each word
    .join(' ');               // Join the words with a space
}