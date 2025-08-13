import fs from 'node:fs';
import path from "node:path";

const inputFile = './public/themes/lara-light-blue/theme.css';
const outputFile = './src/app/styles/tailwind-variables.scss';

const scss = fs.readFileSync(path.join(process.cwd(), inputFile), 'utf8');

const regex = /--([\w-]+\-\d+):\s*([^;]+);/g;
let match;
let lines = [];

while ((match = regex.exec(scss)) !== null) {
  const name = match[1];
  lines.push(`  --color-${name}: var(--${name});`);
}

lines = Array.from(new Set(lines));

const result = `@theme {
${lines.join('\n')}
}
`;

fs.writeFileSync(path.join(process.cwd(), outputFile), result, 'utf8');

console.log(`SCSS file generated: ${outputFile}`);
