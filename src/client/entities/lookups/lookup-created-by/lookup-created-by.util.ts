export type LookupCreatedBy = {
  name: string | null;
  avatar?: string | null;
};

export function getCreatedBy(item: unknown): LookupCreatedBy {
  const source = item as { adminName?: string | null };

  return {
    name: source.adminName ?? null,
    avatar: null,
  };
}
