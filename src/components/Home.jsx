/* eslint-disable react/jsx-indent */
/* eslint-disable no-console */
/* eslint-disable react/require-default-props */
/* eslint-disable react/no-unused-prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Home.css';
import { MenuItem, Select } from '@mui/material';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import NoSsr from '@mui/material/NoSsr';
import { GetMovies, FilterByLanguage } from '../actions';

function Home() {
  const dispatch = useDispatch();
  const allMovies = useSelector((state) => state.movies);
  const allFilters = useSelector((state) => state.filterSelect);
  const errorApi = useSelector((state) => state.error);
  const error = Object.values(errorApi).map((el) => el);
  console.log(error[1]);

  // eslint-disable-next-line max-len
  const mapSelect = allMovies.length === 100 ? allMovies.map((item) => [item.original_language, item]) : allFilters.map((item) => [item.original_language, item]);

  const mapSelectFiltered = new Map(mapSelect);

  const allLanguages = [...mapSelectFiltered.values()];

  useEffect(() => {
    dispatch(GetMovies());
  }, [dispatch]);

  function Filter(e) {
    console.log(e.target.value);
    dispatch(FilterByLanguage(e.target.value));
  }

  // styles table

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {

      fontSize: 20,
    },
  }));

  const theme = createTheme({
    palette: {
      primary: {
        main: '#005AEB',
      },
    },
  });

  const StyledAvatar = styled(TableCell)`
  // eslint-disable-next-line no-shadow
  ${({ theme }) => `
  cursor: pointer;
  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    transform: scale(1.3);
  }
  `}
`;

  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell><Typography>Poster</Typography></StyledTableCell>
              <StyledTableCell><Typography>Movie Title</Typography></StyledTableCell>
              <StyledTableCell><Typography>Release</Typography></StyledTableCell>
              <StyledTableCell><Typography>Ranking</Typography></StyledTableCell>
              <ThemeProvider theme={theme}>
                <StyledTableCell>
                  <Select
                    sx={{ backgroundColor: 'white' }}
                    theme={theme}
                    value="a"
                    label="Languages"
                    onChange={(e) => Filter(e)}
                  >
                    <MenuItem value="a">
                      <em>Languages</em>
                    </MenuItem>
                    <MenuItem value="all">
                      <em>Reload</em>
                    </MenuItem>
                    {allLanguages.map((elem) => (
                      <MenuItem value={elem.original_language} key={elem.id}>
                        {elem.original_language}
                      </MenuItem>
                    ))}
                  </Select>
                </StyledTableCell>
              </ThemeProvider>
              <StyledTableCell align="right"><Typography>Review</Typography></StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {allMovies && allMovies.map((el) => (
              <TableRow key={el.id}>
                <NoSsr>
                    <StyledAvatar>
                      <img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} className="img" alt="Poster Not found" />
                    </StyledAvatar>
                </NoSsr>
                <TableCell><Typography>{el.title}</Typography></TableCell>
                <TableCell><Typography>{el.release_date}</Typography></TableCell>
                <TableCell><Typography>{el.vote_average}</Typography></TableCell>
                <TableCell><Typography>{el.original_language}</Typography></TableCell>
                <TableCell align="right"><Typography>{el.overview.substring(0, 100)}</Typography></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      { error && <h1>{error[0]}</h1>}
    </>
  );
}

Home.propTypes = {
  allMovies: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      overview: PropTypes.string.isRequired,
      vote_average: PropTypes.number.isRequired,
      release_date: PropTypes.string.isRequired,
    }),
  ),
  allLanguages: PropTypes.arrayOf(
    PropTypes.shape({
      original_language: PropTypes.string,
    }),
  ),
};

export default Home;
