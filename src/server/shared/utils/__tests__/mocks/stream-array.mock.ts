import StreamArray from 'stream-json/streamers/StreamArray';
import { vi } from 'vitest';

StreamArray.prototype.destroy = vi.fn();
