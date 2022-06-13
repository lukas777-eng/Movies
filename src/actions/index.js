import axios from 'axios';


export function GetMovies(){

        return (dispatch) => {
          

            const endpoints = [
                'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=1',
                'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=2',
                'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=3',
                'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=4',
                'https://api.themoviedb.org/3/movie/top_rated?api_key=d023cfe53943d6e26b3d31eb89dad6e6&language=en-US&page=5',
              ]
                  axios.all(endpoints.map((endpoint) => axios.get(endpoint))).then(
                   
                    axios.spread((res, res1, res2, res3, res4) => {
                         dispatch(   {
                                    type: 'GET_MOVIES', 
                                    payload:  {
                                        a: [res.data.results.concat(res1.data.results).concat(res2.data.results).concat(res3.data.results).concat(res4.data.results)],
                                        b: [res.data.results.concat(res1.data.results).concat(res2.data.results).concat(res3.data.results).concat(res4.data.results)]
                                    }
                                })
                   }))

    }
}

export function FilterByLanguage(payload) {
    return {
        type: 'FILTER_LANGUAGE',
        payload,
    }
}