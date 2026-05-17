import * as readline from 'node:readline';
import { spawnSync } from 'node:child_process';
import os from 'node:os';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Enter migration name (for example, AddUserTable or UpdateErrorLogs): ', (answer) => {
  const name = answer.trim();

  if (!name) {
    console.error('Error: Migration name cannot be empty!');
    rl.close();
    process.exitCode = 1;
    return;
  }

  if (!/^[a-zA-Z0-9_]+$/.test(name)) {
    console.error('Error: Migration name can only contain Latin letters, digits, and underscores.');
    rl.close();
    process.exitCode = 1;
    return;
  }

  const dataSourcePath = 'src/server/database/database-connection.ts';
  const migrationsDir = `src/server/database/migrations/${name}`;

  console.log(`\nGenerating migration: ${name}...`);

  const isWindows = os.platform() === 'win32';

  const command = isWindows ? 'cmd' : 'npx';
  const baseArgs = [
    'tsx',
    '--env-file=.env',
    'node_modules/typeorm/cli.js',
    'migration:generate',
    migrationsDir,
    '-d',
    dataSourcePath,
  ];

  const args = isWindows ? ['/c', 'npx', ...baseArgs] : baseArgs;

  try {
    const result = spawnSync(command, args, { stdio: 'inherit' });

    if (result.error) {
      throw result.error;
    }

    if (result.status !== 0) {
      console.error(`\nError: TypeORM exited with code ${result.status}.`);
      console.error('This usually means the Entity has no new changes, or the database is unavailable.');
      process.exitCode = result.status ?? 1;
    } else {
      console.log('\nMigration generated successfully!');
    }
  } catch (error) {
    console.error('\nSystem error while executing command:');
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error(String(error));
    }
    process.exitCode = 1;
  } finally {
    rl.close();
  }
});
