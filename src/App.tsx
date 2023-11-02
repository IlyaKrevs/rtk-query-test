import React, { useEffect, useState } from 'react';
import './App.css';
import { ITodoItem } from './store/queryServices/todoType';

import { useFetchAllTodosQuery } from './store/queryServices/todoService';


import { useAppDispath, useAppSelector } from './store/hooks';
import { FilterByParams } from './store/slices/todoSlice/todoTypes';

import { setDefaultData, setFilterBy, setSortBy } from './store/slices/todoSlice/todoSlice';

function App() {

  ///////// data
  const dispatch = useAppDispath();
  const myCurrentData = useAppSelector((state) => state.localTodo.currentData)


  const { data, isError, isLoading } = useFetchAllTodosQuery('');

  useEffect(() => {
    if (!isError && !isLoading) {
      dispatch(setDefaultData(data))
    }
  }, [data])
  ///////////////////////////////////////////////////////////////////////



  ///////// filters
  const [filterValue, setFilterValue] = useState<FilterByParams>('');

  useEffect(() => {
    dispatch(setFilterBy(filterValue))
  }, [filterValue])


  const mySelectFilters = [
    {
      value: '',
      title: 'none',
    },
    {
      value: 'true',
      title: 'true',
    },
    {
      value: 'false',
      title: 'false',
    },
  ]
  ///////////////////////////////////////////////////////////////////////





  ///////// pagination
  const numberShowItems: number = 20;

  const [showItems, setShowItems] = useState<ITodoItem[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageCount, setPageCount] = useState<number>(0);


  //// setShowItems
  useEffect(() => {
    if (myCurrentData) {
      setShowItems(myCurrentData.slice((currentPage - 1) * numberShowItems, numberShowItems * currentPage))
    }
  }, [myCurrentData, currentPage])

  //// setCurrentPage
  useEffect(() => {
    if (currentPage > pageCount + 1) {
      setCurrentPage(pageCount)
    }
  }, [currentPage, pageCount])

  //// setPageCount
  useEffect(() => {
    if (myCurrentData.length) {
      let count = Math.ceil(myCurrentData.length / numberShowItems)
      setPageCount(count)
    }
  }, [myCurrentData])



  function makePageCountsItem(number: number) {
    let result = []
    for (let i = 0; i < number; i++) {
      result.push(< div className="pageNumber"
        onClick={() => setCurrentPage(i + 1)}
        style={{ backgroundColor: currentPage === i + 1 ? 'greenyellow' : '' }}
      > {i + 1}
      </div >)
    }
    return result
  }
  ///////////////////////////////////////////////////////////////////////



  ///////// search

  const [searchValue, setSearchValue] = useState<string>('')

  useEffect(() => {
    if (searchValue === '') {
      setShowItems(myCurrentData.slice(0, numberShowItems))
      setPageCount(Math.ceil(myCurrentData.length / numberShowItems))
    } else {
      let result = myCurrentData.slice()
        .filter(item => item.userId.toString() === searchValue.toLowerCase())
      setShowItems(result)
      setPageCount(Math.ceil(showItems.length / numberShowItems))
    }
  }, [searchValue])


  ///////////////////////////////////////////////////////////////////////

  return (
    <div className="App">



      <div className="toolsContainer">

        <div className="filterContainer">
          FilterBy : <select value={filterValue}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              setFilterValue(e.target.value)
            }} >
            {mySelectFilters.map((item, index) => {
              return (
                <option
                  key={index}
                  value={item.value}>{item.title}</option>
              )
            })}
          </select>
        </div>

        <div className="sortBtnsContainer">
          <button onClick={() => dispatch(setSortBy('ascend'))}>Ascend 1-2-3</button>
          <button onClick={() => dispatch(setSortBy('descend'))}>Descend 3-2-1</button>
        </div>


        <div className="searchContainer">
          SearchByUserID <input type="text"
            value={searchValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
          />
        </div>
      </div>


      <div className='mainContainer'>
        {isError && <div className='specialMessage'>Error...</div>}
        {isLoading && <div className='specialMessage'>Loading...</div>}
        {!isError && !isLoading && showItems &&
          showItems.map(item => makeOneTodoItem(item))
        }
      </div>

      <div className="countersContainer">
        {pageCount > 0 && makePageCountsItem(pageCount)}
      </div>
    </div >
  );
}

export default App;





function makeOneTodoItem(item: ITodoItem) {
  return (
    <div
      key={item.id}
      className="todoItem">
      <div className="todoItem__id">
        id: {item.id}
      </div>
      <div className="todoItem__user">
        userId: {item.userId}
      </div>
      <div className="todoItem_title">
        title: {item.title}
      </div>
      <div className="todoItem_status"
        style={{ color: item.completed ? 'green' : 'red' }}>
        status: {item.completed.toString()}
      </div>
    </div>
  )
}