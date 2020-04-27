import {Injectable} from '@angular/core';
import {TableState} from '../shared/table-state';
import {TableComponent} from '../table.component';

@Injectable({
    providedIn: 'root'
})
export class TableStateService {

    private states: { [name: string]: TableState; } = {};

    private static getEmptyState(): TableState {
        return {
            selection: [],
            filters: {},
            pagination: {},
            order: {}
        };
    }

    public getState(table: TableComponent): TableState {
        const stateName = table.stateName;

        let state = TableStateService.getEmptyState();

        if (stateName) {
            state = this.states[stateName] || state;
        }

        return state;
    }

    public saveState(table: TableComponent): this {
        const stateName = table.stateName;

        if (stateName) {
            this.states[stateName] = {
                selection: table.getSelectedEntities(),
                filters: table.getFilters(),
                pagination: table.getPagination(),
                order: table.getOrder()
            };
        }

        return this;
    }

    public initState(table: TableComponent): this {
        const state = this.getState(table);

        table.selection.selection = state.selection;
        table.filter.addFilters(state.filters);
        table.rows = state.pagination.rows || table.rows;
        table.first = state.pagination.first || table.first;
        table.sortField = state.order.sortField || table.sortField;
        table.sortOrder = state.order.sortOrder || table.sortOrder;

        return this;
    }
}
