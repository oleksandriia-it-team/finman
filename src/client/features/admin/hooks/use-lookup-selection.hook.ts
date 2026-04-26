'use client';

import { useState } from 'react';

export function useLookupSelection() {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  function toggleRow(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function clearSelection() {
    setSelected(new Set());
  }

  return {
    selected,
    hasSelection: selected.size > 0,
    isSelected: (id: number) => selected.has(id),
    toggleRow,
    clearSelection,
  };
}
