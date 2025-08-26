import fs from 'fs';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';

export async function getPaginatedItems<T>(
  path: string,
  from: number,
  to: number,
  filtersFns: ((value: T) => boolean)[]
): Promise<T[]> {
  const result: T[] = [];
  let index = 0;

  const jsonStream = fs.createReadStream(path)
    .pipe(parser())
    .pipe(streamArray());

  for await (const { value } of jsonStream) {
    const isValid = filtersFns.every(fn => fn(value));
    if (!isValid) continue;

    if (index >= from && index < to) {
      result.push(value);
    }

    index++;

    if (index >= to) {
      jsonStream.destroy();
      break;
    }
  }

  return result;
}