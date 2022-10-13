import * as React from 'react';
import 'dayjs/locale/es';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import { useTeamStore } from '../../store';
import { visuallyHidden } from '@mui/utils';
import { StandingsData } from '../../utils/types';
import './StandingsTable.scss';

interface StandingsTableProps {
  data: Array<StandingsData>;
}

interface StandingsTableHeadCell {
  teamId: string;
  name: string;
  played: number;
  wins: number;
  losses: number;
  draws: number;
  goalsFavor: number;
  goalsAgainst:number;
  points: string;
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
  id: keyof StandingsTableHeadCell;
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
    id: 'played',
    numeric: true,
    disablePadding: false,
    label: 'JJ',
  },
  {
    id: 'wins',
    numeric: true,
    disablePadding: false,
    label: 'JG',
  },
  {
    id: 'losses',
    numeric: false,
    disablePadding: false,
    label: 'JP',
  },
  {
    id: 'draws',
    numeric: true,
    disablePadding: false,
    label: 'JE',
  },
  {
    id: 'goalsFavor',
    numeric: true,
    disablePadding: false,
    label: 'GF',
  },
  {
    id: 'goalsAgainst',
    numeric: true,
    disablePadding: false,
    label: 'GC',
  },
  {
    id: 'points',
    numeric: true,
    disablePadding: false,
    label: 'Puntos',
  },
];

interface EnhancedTableProps {
  onRequestSort: (event: React.MouseEvent<unknown>, property: keyof StandingsTableHeadCell) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } =
    props;
  const createSortHandler =
    (property: keyof StandingsTableHeadCell) => (event: React.MouseEvent<unknown>) => {
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

export default function EnhancedTable(props: StandingsTableProps) {
  const teams = useTeamStore((state) => state.teams);
  const [order, setOrder] = React.useState<Order>('desc');
  const [orderBy, setOrderBy] = React.useState<keyof StandingsTableHeadCell>('points');
  console.log(props.data);
  const rows = props.data.map((el) => {
    const name = teams.get(el.teamId) || el.teamId;
    const played = el.draws + el.losses + el.wins;
    const points = `${(el.wins * 3) + el.draws} pts`;
    return {
      ...el,
      name,
      played,
      points
    };
  });
  console.log(props.data);
  console.log(rows);

  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof StandingsTableHeadCell,
  ) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  // const isSelected = (id: string) => selectedPlayer?.id === id;

  return (
    <Box sx={{ width: '100%', height: '100%' }}>
      <Paper sx={{ width: '100%', height: '100%', mb: 2, overflowY: 'scroll' }}>
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
            Clasificación
          </Typography>
        </Toolbar>
        <TableContainer>
          <Table
            sx={{ minWidth: '100%' }}
            aria-labelledby='tableTitle'
          >
            <EnhancedTableHead

              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows.slice().sort(getComparator(order, orderBy))
                .map((row) => {
                  return (
                    <TableRow
                      hover
                      // onClick={(event) => handleClick(event, row)}
                      tabIndex={-1}
                      key={row.teamId}
                      className="standings-table__row"
                    >
                      <TableCell
                        component="th"
                        id={row.teamId}
                        scope="row"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell>{row.played}</TableCell>
                      <TableCell>{row.wins}</TableCell>
                      <TableCell>{row.losses}</TableCell>
                      <TableCell>{row.draws}</TableCell>
                      <TableCell>{row.goalsFavor}</TableCell>
                      <TableCell>{row.goalsAgainst}</TableCell>
                      <TableCell>{row.points}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}