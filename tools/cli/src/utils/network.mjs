// External
import net from 'net';
import chalk from 'chalk';

export async function checkPortUp(port) {
  const portNumber = parseInt(port, 10);
  if (isNaN(portNumber) || portNumber < 0 || portNumber >= 65536) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    const client = new net.Socket();
    client
      .once('connect', () => {
        client.end();
        resolve(true);
      })
      .once('error', () => {
        resolve(false);
      })
      .once('timeout', () => {
        resolve(false);
      })
      .connect({ port: portNumber, host: '127.0.0.1', timeout: 1000 });
  });
}


export function getStatus(status) {
  return status ? chalk.green('UP') : chalk.red('DOWN');
}