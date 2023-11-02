import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ITodoItem } from './todoType'

export const todoApi = createApi({
    reducerPath: 'todoApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
    endpoints: (builder) => ({
        fetchAllTodos: builder.query<ITodoItem[], string>({
            query: () => `/todos`,
        })
    })
})

export const { useFetchAllTodosQuery } = todoApi;