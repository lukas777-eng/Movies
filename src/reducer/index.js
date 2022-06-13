

  const initialState = {
    movies : [],
    fil2 : [],
    fil : [],
}



function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_MOVIES':
            return{
                ...state,
                movies: action.payload.a.shift(),
                fil2: action.payload.b.shift(),    
            }
        
        case 'FILTER_LANGUAGE':
          let allMovies = state.movies;
          let allFil2 = state.fil2

          const personasMap = allFil2.map(item=>{
            return [item.original_language ,item]
          });
          
          let a = personasMap.map(item=>{
            return [  item[0] === action.payload,  item]
          });
          const b = a.filter(el=> el[0] === true)
          const c = b.map(el=>el.reverse().shift().reverse().shift())

          let temperamentsFiltered = action.payload === "all"  ? allMovies: c
          
            return {
                 ...state,
                  movies: temperamentsFiltered,
                  fil: c,
               };
            
            default:
                return state;
        }
}

export default rootReducer