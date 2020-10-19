import React from "react";

import {InputBase, SearchIcon} from 'project-elements';

import useSearchBarStyle from './SearchBar.style';

const SearchBar = props => {
  const styles = useSearchBarStyle();
  const {history} = props;
  return (
    <div className={styles.search}>
      <div className={styles.searchIcon}>
        <SearchIcon/>
      </div>
      <InputBase
        placeholder="Search…"
        classes={{
          root: styles.inputRoot,
          input: styles.inputInput2,
        }}
        onKeyPress={event => {
          if (event.key === 'Enter')
            if (event.target.value.trim().length > 0) {
              history.push(`/admin/search/${event.target.value}`);
              event.target.value = '';
            }
        }}
        inputProps={{'aria-label': 'search'}}
      />
    </div>
  );
};

export default SearchBar;