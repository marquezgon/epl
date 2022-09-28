import { useFormik } from 'formik';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import { white } from '../../utils/colors';

type Search = (searchTerm: string) => Promise<any>;
type SearchChange = (searchTerm: string) => void;

interface SearchFieldProps {
  onSearch: Search;
  onChange?: SearchChange;
}

const SearchField = (props: SearchFieldProps) => {
  const formik = useFormik({
    initialValues: {
      searchPlayers: ''
    },
    onSubmit: (data) => props.onSearch(data.searchPlayers),
  });

  const handleChange = (e: React.ChangeEvent<any>) => {
    formik.handleChange(e);
    if (props.onChange) {
      const term = e.target.value
      props.onChange(term);
    }
  }

  return (
    <form onSubmit={formik.handleSubmit}>
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
        value={formik.values.searchPlayers}
        onChange={handleChange}
      />
    </form>
  )
};

export default SearchField;