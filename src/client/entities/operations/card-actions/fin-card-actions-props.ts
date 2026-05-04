export interface TransactionActionsProps {
  id?: number | undefined;
  icon: string;
  title: string;
  editPath: string;
  handleDelete?: ((id: number) => void) | undefined;
}
