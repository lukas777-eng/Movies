import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetMovies, FilterByLanguage } from '../actions';

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
  const allMovies = useSelector ((state) => state.movies);  
  const allFil = useSelector ((state) => state.fil);      
  const allFil2 = useSelector ((state) => state.fil2);          
    

let personasMap1 =  allMovies.length === 100? allMovies.map(item=>{
  return [item.original_language ,item]
}) : allFil2.map(item=>{
  return [item.original_language ,item]
});

var personasMapArr1 = new Map(personasMap1); // Pares de clave y valor

let unicos1 = [...personasMapArr1.values()]; // Conversión a un array

  useEffect(() => {
    dispatch(GetMovies())  
  }, [dispatch])


 function Filter(e) {
   dispatch(FilterByLanguage(e.target.value));
 }


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
            <TableCell>               
                  <select  onChange={(e) => Filter(e)}>
                    <option value="all">Languages</option>
                    <>
                    {unicos1.map((elem) => (
                    <option value={elem.original_language}>{elem.original_language}</option>
                    ))}
                    </>
                </select>
                </TableCell>
            <TableCell align="right">Description</TableCell>
          </TableRow>
        </TableHead>
          <TableBody>
          {allMovies?.map((el, id) => (
            <>
               <TableRow >
                 <TableCell><img src={ `https://image.tmdb.org/t/p/w500${el.poster_path}`} className="img" /></TableCell>
                 <TableCell>{el.title}</TableCell><TableCell>{el.release_date}</TableCell>
                 <TableCell>{el.vote_average}</TableCell>
                 <TableCell>{el.original_language}</TableCell>
                 {/* <TableCell align="right">{el.overview.substring(0, 100)}...</TableCell> */}
               </TableRow>
             </>
          ))}
        </TableBody>
        </Table>
    </TableContainer> 

    </>
  )
}

export default Home