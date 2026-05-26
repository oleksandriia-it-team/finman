import { create } from 'zustand/react';
import type { RegularEntry } from '@common/records/regular-entry.record';
import type { MonthOperationItem } from '@frontend/features/budget-plan/hooks/budget-plan-form/create-budget-plan/use-budget-plan.hook';

interface BudgetPlanDraftStore {
  selectedIds: Set<number>;
  monthOperations: MonthOperationItem[];
  plannedRegularEntries: RegularEntry[];
  tempIdCounter: number;
  isInitialized: boolean;

  toggleSelectedEntry: (entry: RegularEntry) => void;
  addMonthOperation: (op: Omit<MonthOperationItem, 'id'>) => void;
  deleteMonthOperation: (id: number) => void;
  initDraft: (plannedRegularEntries: RegularEntry[], monthOperations: MonthOperationItem[]) => void;
  resetDraft: () => void;
}

export const useBudgetPlanDraftStore = create<BudgetPlanDraftStore>((set) => ({
  selectedIds: new Set(),
  monthOperations: [],
  plannedRegularEntries: [],
  tempIdCounter: -1,
  isInitialized: false,

  toggleSelectedEntry: (entry) =>
    set((state) => {
      const nextIds = new Set(state.selectedIds);
      if (nextIds.has(entry.id)) {
        nextIds.delete(entry.id);
        return {
          selectedIds: nextIds,
          plannedRegularEntries: state.plannedRegularEntries.filter((e) => e.id !== entry.id),
        };
      }
      nextIds.add(entry.id);
      return {
        selectedIds: nextIds,
        plannedRegularEntries: [...state.plannedRegularEntries, entry],
      };
    }),

  addMonthOperation: (op) =>
    set((state) => ({
      monthOperations: [...state.monthOperations, { ...op, id: state.tempIdCounter }],
      tempIdCounter: state.tempIdCounter - 1,
    })),

  deleteMonthOperation: (id) =>
    set((state) => ({
      monthOperations: state.monthOperations.filter((op) => op.id !== id),
    })),

  initDraft: (plannedRegularEntries, monthOperations) =>
    set((state) => {
      if (state.isInitialized) return {};
      return {
        isInitialized: true,
        selectedIds: new Set(plannedRegularEntries.map((e) => e.id)),
        plannedRegularEntries,
        monthOperations,
        tempIdCounter: -1,
      };
    }),

  resetDraft: () =>
    set({
      isInitialized: false,
      selectedIds: new Set(),
      monthOperations: [],
      plannedRegularEntries: [],
      tempIdCounter: -1,
    }),
}));
