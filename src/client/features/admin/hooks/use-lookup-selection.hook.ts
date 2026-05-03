'use client';

import { useState } from 'react';

export function useLookupSelection() {
  const [selected, setSelected] = useState<Set<number>>(new Set());

  function toggleRow(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function clearSelection() {
    setSelected(new Set());
  }

  function deselect(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  }

  return {
    selected,
    hasSelection: selected.size > 0,
    isSelected: (id: number) => selected.has(id),
    toggleRow,
    clearSelection,
    deselect,
  };
}
