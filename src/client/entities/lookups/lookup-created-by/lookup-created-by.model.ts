export type LookupCreatedByFields = {
  createdByName?: string | null;
  createdByAvatar?: string | null;
  createdBy?: { name?: string | null; avatar?: string | null } | string | null;
  userName?: string | null;
  userAvatar?: string | null;
};

export type LookupCreatedBy = {
  name: string | undefined;
  avatar: string | undefined;
};
