export type LookupCreatedBy = {
  name: string | null;
  avatar?: string | null;
};

export function getCreatedBy(item: unknown): LookupCreatedBy {
  const source = item as { admin?: { name?: string | null } | null };

  return {
    name: source.admin?.name ?? null,
    avatar: null,
  };
}
