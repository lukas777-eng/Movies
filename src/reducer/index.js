

  const initialState = {
    movies : [],
}



function rootReducer(state = initialState, action){
    switch(action.type){
        case 'GET_MOVIES':
            return{
                ...state,
                movies: action.payload
                     //en mi estado movies que en un principio es un array vacio manda todo lo que mande la accion getMovies
                // allDogs: action.payload,    
                        //y poné todos lo personajes en allDogs también (esto me sirve para los filtros)
            }
            default:
                return state;
        }
}

export default rootReducer