import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './Home.css'

const Home = () => {

  const [movies, setMovies] = useState({ data: [] })

  useEffect(() => {
    const endpoints = [
      'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=1',
      'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=2',
      'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=3',
      'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=4',
      'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=5',
    ]
    axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
      axios.spread((res, res1, res2, res3, res4) => {
setMovies({ data: [res.data.results.concat(res1.data.results).concat(res2.data.results).concat(res3.data.results).concat(res4.data.results)]})
      }))
  }, [setMovies])

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
     <TableHead>
          <TableRow>
            <TableCell>Poster</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Release Date</TableCell>
            <TableCell>Ranking</TableCell>
            <TableCell>Language</TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
          {movies.data.map((el, id) => (
            <>
              {el.map(el => 
               <TableRow >
                 <TableCell><img src={ `https://image.tmdb.org/t/p/w500${el.poster_path}`} className="img" /></TableCell>
                 <TableCell>{el.title}</TableCell><TableCell>{el.release_date}</TableCell>
                 <TableCell>{el.vote_average}</TableCell>
                 <TableCell>{el.original_language}</TableCell>
                 <TableCell align="right">{el.overview.substring(0, 100)}...</TableCell>
               </TableRow>)}
             </>
          ))}
        </TableBody>
        </Table>
    </TableContainer>

    </>
  )
}

export default Home