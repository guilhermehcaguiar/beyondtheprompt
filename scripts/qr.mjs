import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, renameSync, rmSync } from 'node:fs';
import { resolve, join } from 'node:path';

const [address, output = 'qr-code', ...extra] = process.argv.slice(2);
let url;
try {
  url = new URL(address);
  if (url.protocol !== 'https:' || url.username || url.password || extra.length > 0) throw new Error();
} catch {
  console.error('Uso: npm run qr -- <URL HTTPS definitiva> [diretório de saída]');
  process.exit(1);
}

const destination = resolve(output);

try {
  mkdirSync(destination, { recursive: true });
  const staging = mkdtempSync(join(destination, '.qr-'));
  try {
    for (const [type, scale] of [
      ['SVG', '8'],
      ['PNG', '32'],
    ]) {
      const name = `beyond-the-prompt.${type.toLowerCase()}`;
      execFileSync(
        'qrencode',
        ['-t', type, '-s', scale, '-m', '4', '-l', 'Q', '-o', join(staging, name), '--', url.href],
        { stdio: 'inherit' },
      );
    }
    for (const extension of ['svg', 'png']) {
      const name = `beyond-the-prompt.${extension}`;
      renameSync(join(staging, name), join(destination, name));
    }
    console.log(`SVG e PNG gerados em ${destination}\nDestino codificado: ${url.href}`);
  } finally {
    rmSync(staging, { recursive: true, force: true });
  }
} catch (error) {
  console.error(error.code === 'ENOENT' ? 'Instale o utilitário qrencode e tente novamente.' : error.message);
  process.exitCode = 1;
}
