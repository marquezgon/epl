import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { white } from '../../utils/colors';
import React from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Search = (searchTerm: string) => Promise<any>;
type SearchChange = (searchTerm: string) => void;

interface SearchFieldProps {
  onSearch: Search;
  onChange?: SearchChange;
  value: string;
}

const SearchField = (props: SearchFieldProps) => {

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    props.onSearch(props.value);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (e: React.ChangeEvent<any>) => {
    if (props.onChange) {
      const term = e.target.value
      props.onChange(term);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        sx={{ my: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          sx: { backgroundColor: white }
        }}
        fullWidth
        name='searchPlayers'
        variant='standard'
        placeholder='Buscar'
        value={props.value}
        onChange={handleChange}
      />
    </form>
  )
};

export default SearchField;