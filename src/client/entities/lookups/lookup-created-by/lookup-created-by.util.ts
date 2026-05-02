export type LookupCreatedBy = {
  name: string | null;
  avatar?: string | null;
};

type ItemWithAdmin = {
  admin?: { name?: string | null } | null;
};

export function getCreatedBy(item: ItemWithAdmin): LookupCreatedBy {
  return {
    name: item.admin?.name ?? null,
    avatar: null,
  };
}
