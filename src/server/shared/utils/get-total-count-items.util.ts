import fs from 'fs';
import { parser } from 'stream-json';
import { streamArray } from 'stream-json/streamers/StreamArray';
import path from 'node:path';
import { PathToPublic } from '../../../common/path-to-public.constant';

export async function getTotalCountItems<T>(
  pathToJson: string,
  filtersFns: ((value: T) => boolean)[],
): Promise<number> {
  let count = 0;

  const jsonStream = fs.createReadStream(path.join(PathToPublic, pathToJson)).pipe(parser()).pipe(streamArray());

  for await (const { value } of jsonStream) {
    const isValid = filtersFns.every((fn) => fn(value));
    if (!isValid) continue;

    count++;
  }

  jsonStream.destroy();

  return count;
}
