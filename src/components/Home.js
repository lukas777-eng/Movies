import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { GetMovies, FilterByLanguage } from '../actions';
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
  const allMovies = useSelector ((state) => state.movies);          

console.log(allMovies)


let personasMap = allMovies.map(item=>{
  return [item.original_language ,item]
});
console.log(personasMap)

console.log(personasMap.map(el=> el[0]))



let a = personasMap.map(item=>{
  return [   item[0] === 'en',  item]
});
const b = a.filter(el=> el[0] === true)
console.log(b)
console.log(b.map(el=>el.reverse().shift().reverse().shift()))
console.log(typeof b)
console.log( a)



var personasMapArr = new Map(personasMap.map(item=>{
  return [  item !== 'en',  item]
})); // Pares de clave y valor

console.log(personasMapArr)



// let unicos = [...personasMapArr.values()]; // Conversión a un array







//   const fil = useSelector ((state) => state.fil);    
 
// console.log(fil)
// console.log(allMovies.map(el=>el))


 


// console.log(unicos.map(el=> el))
//   for (let clave in unicos){
//     console.log(unicos[clave]);
//   }  
//   console.log( Object.values(unicos) )

let personasMap1 = allMovies.map(item=>{
  return [item.original_language ,item]
});
var personasMapArr1 = new Map(personasMap1); // Pares de clave y valor

let unicos1 = [...personasMapArr1.values()]; // Conversión a un array

console.log(unicos1.map(el=> el.original_language));




  useEffect(() => {
    dispatch(GetMovies())  
  }, [dispatch])





 function Filter(e) {
  //  e.preventDefault();
  //  console.log(e)
  //  console.log(e.target)
   console.log(e.target.value)


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
                        {/* {fil.map((el, id) => (
                           <select onChange={e => FilterByLanguage(e)}>
                          <>
                 <option  value={el} >{el}</option>
                 
                </>
                </select>
                ))} */}
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