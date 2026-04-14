import { type DelayedExpense } from './delayed-expenses.record';
import { type RegularEntry } from './regular-entry.record';
import { type UnregularEntry } from './unregular-entry.record';

export type Entry = RegularEntry | UnregularEntry | DelayedExpense;
