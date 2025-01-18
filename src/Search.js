import React from 'react';

const Search = ({search, setSearch}) => {
  return (
    <form className='searchForm' onSubmit={(e) => e.preventDefault()}>
    <label>Search Form</label>
      <input
        id='searchPosts'
        type="text"
        placeholder='Search Posts'
        value={search}
        onChange={(e) => setSearch(e.target.value)}
          />
    </form>
  );
}

export default Search;
