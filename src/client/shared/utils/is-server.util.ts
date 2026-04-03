import { isEmpty } from '@common/utils/is-empty.util';

export function isServer() {
  return isEmpty(window);
}
