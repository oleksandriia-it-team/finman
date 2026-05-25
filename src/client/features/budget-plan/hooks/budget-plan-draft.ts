import { create } from 'zustand/react';
import type { RegularEntry } from '@common/records/regular-entry.record';
import type { MonthOperationItem } from '@frontend/features/budget-plan/hooks/budget-plan-form/create-budget-plan/use-budget-plan.hook';

interface BudgetPlanDraftStore {
  selectedIds: Set<number>;
  monthOperations: MonthOperationItem[];
  plannedRegularEntries: RegularEntry[];
  tempIdCounter: number;
  isInitialized: boolean;

  toggleSelectedId: (id: number) => void;
  addMonthOperation: (op: Omit<MonthOperationItem, 'id'>) => void;
  deleteMonthOperation: (id: number) => void;
  setPlannedRegularEntries: (entries: RegularEntry[]) => void;
  initDraft: (selectedIds: number[], monthOperations: MonthOperationItem[]) => void;
  resetDraft: () => void;
}

export const useBudgetPlanDraftStore = create<BudgetPlanDraftStore>((set) => ({
  selectedIds: new Set(),
  monthOperations: [],
  plannedRegularEntries: [],
  tempIdCounter: -1,
  isInitialized: false,

  toggleSelectedId: (id) =>
    set((state) => {
      const next = new Set(state.selectedIds);
      next.has(id) ? next.delete(id) : next.add(id);
      return { selectedIds: next };
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

  setPlannedRegularEntries: (entries) => set({ plannedRegularEntries: entries }),

  initDraft: (selectedIds, monthOperations) =>
    set((state) => {
      if (state.isInitialized) return {};
      return {
        isInitialized: true,
        selectedIds: new Set(selectedIds),
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
