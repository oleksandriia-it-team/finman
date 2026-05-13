import * as readline from 'node:readline';
import { execSync } from 'node:child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('Введіть назву міграції (наприклад, AddUserTable або UpdateErrorLogs): ', (answer) => {
  const name = answer.trim();

  if (!name) {
    console.error('Помилка: Назва міграції не може бути порожньою!');
    rl.close();
    process.exit(1);
  }
  const dataSourcePath = 'src/server/database/database-connection.ts';
  const migrationsDir = `src/server/database/migrations/${name}`;
  const command = `npx tsx --env-file=.env node_modules/typeorm/cli.js migration:generate ${migrationsDir} -d ${dataSourcePath}`;

  console.log(`\nГенерую міграцію: ${name}...`);
  console.log(`> ${command}\n`);

  try {
    execSync(command, { stdio: 'inherit' });
    console.log('\nМіграція успішно згенерована!');
  } catch (error) {
    console.error('\nПомилка при генерації міграції. Перевір підключення до бази та синтаксис Entity.');
  } finally {
    rl.close();
  }
});
