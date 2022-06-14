

  const initialState = {
    movies : [],
    filterSelect : [],
    fil : [],
}



function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_MOVIES':
            return{
                ...state,
                movies: action.payload.movie.shift(),
                filterSelect: action.payload.filter.shift(),    
            }
        
        case 'FILTER_LANGUAGE':
          
          let allFil = state.filterSelect

          const filterMap = allFil.map(item=>{
            return [item.original_language ,item]
          });
          
          let filterAction = filterMap.map(item=>{
            return [  item[0] === action.payload,  item]
          });
          const filterTrueFalse = filterAction.filter(el=> el[0] === true)
          const filterEnd = filterTrueFalse.map(el=>el.reverse().shift().reverse().shift())

          let allFiltered = action.payload === "all"  ? allFil: filterEnd
          
            return {
                 ...state,
                  movies: allFiltered,
                  fil: filterEnd,
               };
            
            default:
                return state;
        }
}

export default rootReducer