export type LookupCreatedBy = {
  name: string | null;
  avatar?: string | null;
};

export type ItemWithAdmin = {
  admin?: { name?: string | null } | null;
};

export function getCreatedBy<T extends ItemWithAdmin>(item: T): LookupCreatedBy {
  return {
    name: item.admin?.name ?? null,
    avatar: null,
  };
}
