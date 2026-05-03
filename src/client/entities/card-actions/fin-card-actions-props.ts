export interface TransactionActionsProps {
  id?: number;
  icon: string;
  title: string;
  editPath: string;
  handleDelete?: (id: number) => void;
}
