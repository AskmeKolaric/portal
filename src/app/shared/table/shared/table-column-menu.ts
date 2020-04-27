export interface TableColumnMenuButton {
    click: (entity) => void;
    icon?: string;
    class?: string;
    tooltip?: string;
    hotkey?: string;
    condition?: () => void;
    seleniumId?: string;
}

export interface TableColumnMenu {
    buttons: TableColumnMenuButton[];
}
