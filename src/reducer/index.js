

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
                movies: action.payload.shift(),
                     //en mi estado movies que en un principio es un array vacio manda todo lo que mande la accion getMovies
                fil: action.payload.map(el => el.map(el=> el.original_language)).shift(),    
                        //y poné todos lo personajes en allDogs también (esto me sirve para los filtros)
            }
        
        case 'FILTER_LANGUAGE':
          // let personasMap = allMovies.map(item=>{
          //   return [item.original_language === "en",item]
          // });
          
          // console.log(personasMap.map(el=> el != false))
          
          
          
          // let a = personasMap.map(item=>{
          //   return [  item != false,  item]
          // });
          // console.log(a)

          
          let allMovies = state.movies;

          let personasMap = allMovies.map(item=>{
            return [item.original_language ,item]
          });
          
          let a = personasMap.map(item=>{
            return [  item[0] === action.payload,  item]
          });
          const b = a.filter(el=> el[0] === true)
          const c = b.map(el=>el.reverse().shift().reverse().shift())

          // let temperamentsFiltered = action.payload === "all"  ? allMovies: allDog.filter((item,index)=>{
          //   return allDog.indexOf(item) === index;
          // })
          // let personasMap = allMovies.map(item=>{
          //   return [item.original_language,item]
          // });
          // var personasMapArr = new Map(personasMap); // Pares de clave y valor
          
          // let unicos = [...personasMapArr.values()]; // Conversión a un array
          
          // console.log(unicos);
            return {
                 ...state,
                  movies: c,
               };
            
            default:
                return state;
        }
}

export default rootReducer