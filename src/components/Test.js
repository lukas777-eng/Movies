import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { GetMovies, FilterByLanguage } from '../actions';

const Test = () => {

    const dispatch = useDispatch();                                                 //declaro la const dispatch para despachar mis acciones, con el hook useDispatch
    const allMovies = useSelector ((state) => state.movies);  

    const data = allMovies.map(el => el.map(el=> el.original_language))
console.log(allMovies)
console.log(data)
var result = [];

 data.forEach((item)=>{
  //pushes only unique element

    if(!result.includes(item)){
    result.push(item);
  }
})
console.log(result);

 
  useEffect(() => {
    // var endpoints = [
    //     'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=1',
    //     'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=2',
    //     'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=3',
    //     'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=4',
    //     'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=5',
    //   ]

    //     axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
    //     axios.spread((res, res1, res2, res3, res4) => {
    // var movie = [res.data.results.concat(res1.data.results).concat(res2.data.results).concat(res3.data.results).concat(res4.data.results)]
    // console.log(movie)

    //     }))
    const endpoint =  'https://api.themoviedb.org/3/discover/movie?api_key=fa88f1c616ff903d0994cf1cdcdfd1d5&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate';
    axios.get(endpoint)
         .then(response => {
             const api = response.data.results
         })


}, [])

return (
<><p>d</p></>
)
}


export default Test



