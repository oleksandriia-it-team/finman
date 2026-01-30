import fs from 'fs';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';
import path from 'node:path';
import { PathToPublic } from '../../../common/path-to-public.constant';

export async function getPaginatedItems<T>(
  pathToJson: string,
  from: number,
  to: number,
  filtersFns: ((value: T) => boolean)[],
): Promise<T[]> {
  const result: T[] = [];
  let index = 0;

  const jsonStream = fs.createReadStream(path.join(PathToPublic, pathToJson)).pipe(parser()).pipe(streamArray());

  for await (const { value } of jsonStream) {
    const isValid = filtersFns.every((fn) => fn(value));
    if (!isValid) continue;

    if (index + 1 >= from && index + 1 < to) {
      result.push(value);
    }

    index++;

    if (index >= to) {
      break;
    }
  }

  return result;
}
