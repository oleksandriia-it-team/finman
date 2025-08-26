import fs from 'fs';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';

export async function getTotalCountItems<T>(
  path: string,
  filtersFns: ((value: T) => boolean)[]
): Promise<number> {
  let count = 0;

  const jsonStream = fs.createReadStream(path)
    .pipe(parser())
    .pipe(streamArray());

  for await (const { value } of jsonStream) {
    const isValid = filtersFns.every(fn => fn(value));
    if (!isValid) continue;

    count++;
  }

  jsonStream.destroy();


  return count;
}