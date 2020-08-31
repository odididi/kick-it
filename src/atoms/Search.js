import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const Search = ({options}) => {
  return (
    <Autocomplete
      freeSolo
      disableClearable
      options={options.map((option) => option.title)}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search channel"
          margin="normal"
          variant="outlined"
          InputProps={{ ...params.InputProps, type: 'search' }}
        />
      )}
    />
  )
}

export default Search;
