import * as React from 'react';
import { default as dayjs } from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { NumericFormat } from 'react-number-format';
import 'dayjs/locale/es';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import SearchField from '../SearchField/SearchField';
import { getFlag } from '../../utils/utils';
import { PlayerData } from '../../utils/types';
import { useModalStore, usePlayerStore } from '../../store/';
import './TransferablesTable.scss';

const dayjsConfig = {
  rounding: Math.floor
};

dayjs.extend(relativeTime, dayjsConfig);
dayjs.locale('es');

interface TransferablesTableProps {
  players: Array<PlayerData>;
  loadMore: () => object;
  onSearch: (searchTerm: string) => Promise<any>;
  onSearchChange: (searchTerm: string) => void;
  nextToken: string;
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
    a: { [key in Key]: number | string },
    b: { [key in Key]: number | string },
  ) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof PlayerData;
  label: string;
  numeric: boolean;
  isFlag?: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: 'name',
    numeric: false,
    disablePadding: false,
    label: 'Nombre',
  },
  {
    id: 'rating',
    numeric: true,
    disablePadding: false,
    label: 'Rating',
  },
  {
    id: 'position',
    numeric: false,
    disablePadding: false,
    label: 'Posición',
  },
  {
    id: 'price',
    numeric: true,
    disablePadding: false,
    label: 'Precio',
  },
  {
    id: 'wage',
    numeric: true,
    disablePadding: false,
    label: 'Salario',
  },
  {
    id: 'age',
    numeric: true,
    disablePadding: false,
    label: 'Edad',
  },
  {
    id: 'nationality',
    numeric: false,
    disablePadding: false,
    label: 'Nacionalidad',
    isFlag: true
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof PlayerData) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof PlayerData) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.isFlag ? 'center' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable(props: TransferablesTableProps) {
  const selectedPlayer = usePlayerStore((state) => state.selectedPlayer);
  const updateSelectedPlayer = usePlayerStore((state) => state.updateSelectedPlayer);
  const updateShowPlayerDrawer = useModalStore((state) => state.updateShowPlayerDrawer);
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof PlayerData>('name');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const rows = props.players;
  console.log('rows', rows);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof PlayerData,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleClick = (event: React.MouseEvent<unknown>, item: PlayerData) => {
    updateSelectedPlayer(item);
    updateShowPlayerDrawer(true);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangePage = async (event: unknown, newPage: number) => {
    await props.loadMore();
    setPage(newPage);
  };

  const isSelected = (id: string) => selectedPlayer?.id === id;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 }
          }}
          className='transferables-table__toolbar'
        >
          <Typography
            sx={{ flex: '5' }}
            variant="h6"
            id="tableTitle"
            component="div"
          >
            Transferibles
          </Typography>
          <Box sx={{ flex: '2', pr: 2 }}>
            <SearchField onSearch={props.onSearch} onChange={props.onSearchChange} />
          </Box>
        </Toolbar>
        <TableContainer sx={{ height: '550px' }}>
          <Table
            sx={{ minWidth: '100%' }}
            aria-labelledby='tableTitle'
            size='medium'
          >
            <EnhancedTableHead

              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.slice().sort(getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  const isItemSelected = isSelected(row.id);

                  const flag = getFlag(row.nationality);
                  const age = dayjs(row.age).fromNow(true);

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row)}
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                    >
                      <TableCell
                        component="th"
                        id={row.id}
                        scope="row"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>{row.rating}</TableCell>
                      <TableCell>{row.position}</TableCell>
                      <TableCell>
                        <NumericFormat
                          value={row.price}
                          thousandSeparator=","
                          displayType="text"
                          renderText={(value) => `$${value}`}
                        />
                      </TableCell>
                      <TableCell>
                        <NumericFormat
                          value={row.wage}
                          thousandSeparator=","
                          displayType="text"
                          renderText={(value) => `$${value}`}
                        />
                      </TableCell>
                      <TableCell>{age}</TableCell>
                      <TableCell align='center'>
                        <label title={flag?.text}>
                          {flag?.flag}
                        </label>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (45) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10]}
          component="div"
          count={-1}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}