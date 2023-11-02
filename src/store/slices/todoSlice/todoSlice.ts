import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

import { ITodoItem } from '../../queryServices/todoType'
import { FilterByParams, ITodoState, SortByIDParams } from './todoTypes'



const initialState: ITodoState = {
    defaultData: [],
    currentData: [],
    filterBy: '',
    sortByID: 'ascend',
}

export const todoSlice = createSlice({
    name: 'todo',
    initialState,
    reducers: {
        setDefaultData: (state, action: PayloadAction<ITodoItem[] | undefined>) => {
            if (!action.payload) {
                return
            }
            state.defaultData = action.payload;
            state.currentData = action.payload;
        },
        setFilterBy: (state, action: PayloadAction<FilterByParams>) => {
            state.filterBy = action.payload;

            state.currentData = state.defaultData?.slice()
            state.currentData = state.currentData?.filter(item => {
                if (action.payload === '') {
                    return item
                } else {
                    return item.completed.toString() === action.payload.toLowerCase()
                }
            })
            if (state.currentData.length === 0) {
                state.currentData = state.defaultData?.slice()
                state.currentData = state.currentData?.filter(item => {
                    if (action.payload === '') {
                        return item
                    } else {
                        return item.completed.toString() === action.payload.toLowerCase()
                    }
                })
            }
        },
        setSortBy: (state, action: PayloadAction<SortByIDParams>) => {
            state.sortByID = action.payload;
            state.currentData?.sort((a, b) => {
                if (action.payload === 'ascend') {
                    return a.id - b.id
                } else {
                    return b.id - a.id
                }
            })
        }
    }
})

export const { setDefaultData, setFilterBy, setSortBy } = todoSlice.actions;

export default todoSlice.reducer;