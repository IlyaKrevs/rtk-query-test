import { ITodoItem } from "../../queryServices/todoType"

export interface ITodoState {
    defaultData: ITodoItem[],
    currentData: ITodoItem[],
    filterBy: FilterByParams,
    sortByID: SortByIDParams,
}

export type FilterByParams = '' | 'false' | 'true' | string;
export type SortByIDParams = 'ascend' | 'descend';