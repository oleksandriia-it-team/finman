import { describe, expect, it } from 'vitest';
import { JSONFileNames } from '../enums/json-files.enum.js';
import { LazyLoadJsonService } from '../lazy-load-json.service.js';
import * as path from 'node:path';
import { readFile } from 'fs/promises';

global.fetch = async (input: string) => {
  let filePath = input;
  if (input.startsWith('/')) {
    const relativePath = input.slice(1);
    filePath = path.join(process.cwd(), 'public', 'json', relativePath);
  } else {
    filePath = path.resolve(process.cwd(), input);
  }

  const fileContents = await readFile(filePath, 'utf-8');

  return {
    json: async () => JSON.parse(fileContents),
    text: async () => fileContents,
  };
};


describe('LazyLoadJsonService', () => {

  it('should get total items successfully with same filename', async () => {
    const service = new LazyLoadJsonService();
    const name = JSONFileNames.Languages;

    const manifest = await service.getTotalCount(name);

    expect(manifest.chunkPrefix).toBe(name);
    expect(manifest.chunkSize).toBeTypeOf('number');
    expect(manifest.totalChunks).toBeTypeOf('number');
    expect(Math.ceil(manifest.totalCount / manifest.chunkSize)).toBe(manifest.totalChunks);
  });

  it('should fetch all chunks according to totalChunks and verify data counts', async () => {
    const service = new LazyLoadJsonService();
    const name = JSONFileNames.Languages;

    const manifest = await service.getTotalCount(name);

    const chunksData = await Promise.all(
      Array.from({ length: manifest.totalChunks }).map((_, idx) =>
        service.getItems(name, idx + 1)
      )
    );

    const allItems = chunksData.flat();

    expect(allItems.length).toBe(manifest.totalCount);

    chunksData.forEach(chunk => {
      expect(chunk.length).toBeGreaterThan(0);
    });
  });
});