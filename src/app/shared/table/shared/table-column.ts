import { TableColumnFilter } from './table-column-filter';
import { TableColumnInlineEdit } from './table-column-inline-edit';
import { TableColumnSort } from './table-column-sort';
import { TableColumnMenu } from './table-column-menu';
import { TableColumnStyle } from './table-column-style';

export interface TableColumn {
    key: string;
    header: string;
    tooltip?: string;
    visible?: boolean;
    renderType?: string;
    renderTooltip?: () => void;
    renderer?: (entity: any) => void;

    edit?: TableColumnInlineEdit;
    filter?: TableColumnFilter;
    sort?: TableColumnSort;
    menu?: TableColumnMenu;
    style?: TableColumnStyle;
}
