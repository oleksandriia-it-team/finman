interface LookupPageHeaderProps {
  title: string;
  hasSelection: boolean;
  onAdd?: () => void;
  onDelete?: () => void;
}

export function LookupPageHeader({ title, hasSelection, onAdd, onDelete }: LookupPageHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-3 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Lookups</span>
        <span>/</span>
        <span className="font-semibold text-gray-900">{title}</span>
      </div>

      <div className="flex items-center gap-2">
        {hasSelection && (
          <button
            onClick={onDelete}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-red-500 text-white hover:bg-red-600 transition-colors"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14H6L5 6" />
              <path d="M10 11v6M14 11v6" />
              <path d="M9 6V4h6v2" />
            </svg>
          </button>
        )}
        <button
          onClick={onAdd}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
          >
            <line
              x1="12"
              y1="5"
              x2="12"
              y2="19"
            />
            <line
              x1="5"
              y1="12"
              x2="19"
              y2="12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
