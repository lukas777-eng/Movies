import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetMovies } from '../actions';
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
  const dispatch = useDispatch();                                                 //declaro la const dispatch para despachar mis acciones, con el hook useDispatch
  const allMovies = useSelector ((state) => state.movies);                            // este hook es lo mismo que usar el mapStateToProps. Con useSelector traeme en esa constante todo lo que esta en el estado de dogs me trae desde el reducer el estado dogs donde están todos los perros 

console.log(allMovies)

  useEffect(() => {
    dispatch(GetMovies())  
  }, [dispatch])

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
          {allMovies.map((el, id) => (
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