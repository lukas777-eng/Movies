import React, { useEffect, useState } from 'react'
import axios from 'axios';

const Test = () => {

  const [moviesList, setMoviesList] = useState([])

  
  useEffect(() => {
    const endpoint =  'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=1';
    axios.get(endpoint)
         .then(response => {
             const api = response.data;
             setMoviesList(api.results);
         })
}, [setMoviesList])
console.log(moviesList)
return (
<>
  <div>
      {
          moviesList.map((oneMovie, idx) => {
              return (
                  <div key={idx}>
                      <img src={`https://image.tmdb.org/t/p/w500/${oneMovie.poster_path}`} alt='NOT' />
                      <h1>{oneMovie.title}</h1>
                      <p>{oneMovie.overview.substring(0, 100)}...</p>
                  </div>
              )
          })
      }
  </div>
</>
)
}


export default Test



// <TableBody>
// {movies.data.map((el, id) => (
//   <TableRow >
//     <TableCell>{el.map(el => <img src={ `https://image.tmdb.org/t/p/w500${el.poster_path}`} />)}</TableCell>
//     {/* <TableCell align="right">{el.map(el => <li><img src={`https://image.tmdb.org/t/p/w500${el.poster_path}`} />{el.title}</li>)}</TableCell> */}
//   </TableRow>
// ))}
// </TableBody>