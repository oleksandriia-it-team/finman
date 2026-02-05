import { DelayedExpense } from './delayed-expenses.record';
import { RegularEntry } from './regular-entry.record';
import { UnregularEntry } from './unregular-entry.record';

export type Entry = RegularEntry | UnregularEntry | DelayedExpense;
