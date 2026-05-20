import { create } from 'zustand/react';
import type { MonthOperationItem } from '@frontend/features/budget-plan/hooks/budget-plan-form/create-budget-plan/use-budget-plan.hook';

interface BudgetPlanDraftStore {
  selectedIds: Set<number>;
  monthOperations: MonthOperationItem[];
  tempIdCounter: number;

  toggleSelectedId: (id: number) => void;
  addMonthOperation: (op: Omit<MonthOperationItem, 'id'>) => void;
  deleteMonthOperation: (id: number) => void;
  initDraft: (selectedIds: number[], monthOperations: MonthOperationItem[]) => void;
  resetDraft: () => void;
}

export const useBudgetPlanDraftStore = create<BudgetPlanDraftStore>((set) => ({
  selectedIds: new Set(),
  monthOperations: [],
  tempIdCounter: -1,

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

  initDraft: (selectedIds, monthOperations) =>
    set({
      selectedIds: new Set(selectedIds),
      monthOperations,
      tempIdCounter: -1,
    }),

  resetDraft: () =>
    set({
      selectedIds: new Set(),
      monthOperations: [],
      tempIdCounter: -1,
    }),
}));
