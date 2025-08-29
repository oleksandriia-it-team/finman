import fs from 'fs';
import { vi } from 'vitest';
import { Readable } from 'node:stream';
import { localeAndLanguagesFixture } from '../fixtures/locale-and-languages.fixture';

fs.createReadStream = vi.fn(() => {
  const mockStream = new Readable() as fs.ReadStream;
  mockStream._read = () => {
  };
  mockStream.push(JSON.stringify(localeAndLanguagesFixture));
  mockStream.push(null);
  return mockStream;
});