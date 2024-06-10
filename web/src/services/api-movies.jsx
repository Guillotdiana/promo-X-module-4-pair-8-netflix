// login

// Se agregan los parametros que llegan desde App.jsx
const getMoviesFromApi = ({genre, sort}) => {
  console.log('Se están pidiendo las películas de la app');
  // Se muestran en consola para ver su contenido
  console.log(`Genre: ${genre}`);
  console.log(`Sort: ${sort}`);

  // Se define la url de la api
  let apiUrl = '//localhost:4000/movies';

  // urlsearch para manejar las querys params
  const params = new URLSearchParams();

  // agrego parametros se genre y sort si están definidos
  if (genre) {
    params.append('genre', genre);
  }
  if (sort) {
    params.append('sort', sort);
  }

  // agrega los parametros a la query en la  API URL
  const fullUrl = `${apiUrl}?${params.toString()}`;

  return fetch(fullUrl)
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
