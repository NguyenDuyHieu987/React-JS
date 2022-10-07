import axios from 'axios';
import { data } from 'jquery';
import { createContext, useState, useEffect } from 'react';
import { FilterDataMovie } from '../Services/MovieService';
import { FilterContext } from './FilterContext';

function FilterProvider({ children }) {
  const [dataFilter, setDataFilter] = useState([]);
  const [isClickFilter, setIsClickFilter] = useState(false);
  const [pageFilter, setPageFilter] = useState(1);

  const handleOnclickFilter = () => {
    getDataFiter();
    setIsClickFilter(true);
  };

  // useEffect(() => {
  //   getDataFiter();
  // }, [isClickFilter]);
  const getDataFiter = () => {
    const type = document.getElementById('type');
    const sort = document.getElementById('sort');
    const genres = document.getElementById('genres');
    const country = document.getElementById('country');
    const year = document.getElementById('year');

    FilterDataMovie(
      type.value,
      sort.value,
      genres.value,
      country.value,
      year.value,
      pageFilter
    )
      .then((movieResponse) => {
        setDataFilter(movieResponse.data.results);
      })
      .catch((e) => {
        if (axios.isCancel(e)) return;
      });
  };

  return (
    <FilterContext.Provider
      value={{
        dataFilter,
        setDataFilter,
        handleOnclickFilter,
        isClickFilter,
        setIsClickFilter,
        pageFilter,
        setPageFilter,
        getDataFiter,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export default FilterProvider;
