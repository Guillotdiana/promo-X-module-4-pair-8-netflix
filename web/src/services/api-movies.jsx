// login

// Se agregan los parametros que llegan desde App.jsx
const getMoviesFromApi = ({genre, sort}) => {
  console.log('Se están pidiendo las películas de la app');
  // Se muestran en consola para ver su contenido
  console.log(`Genre: ${genre}`);
  console.log(`Sort: ${sort}`);

  // Se define la url de la api
  let apiUrl = '//localhost:4000/movies';

  // Si esta definido el genre, se agrega como query param a la peticion
  if (genre) {
    apiUrl = `${apiUrl}?genre=${genre}`;
  }

  return fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      // CAMBIA EL CONTENIDO DE ESTE THEN PARA GESTIONAR LA RESPUESTA DEL SERVIDOR Y RETORNAR AL COMPONENTE APP LO QUE NECESITA
      return data;
    });
};



const objToExport = {
  getMoviesFromApi: getMoviesFromApi
};

export default objToExport;
