import type { ListScreenHandlerProps } from '@frontend/components/screen-handlers/props/list-screen-handler.props';

export interface TableScreenHandlerProps extends ListScreenHandlerProps {
  totalColumns: number;
}
