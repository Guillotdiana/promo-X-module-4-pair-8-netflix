const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

// create and config server
const server = express();
server.use(cors());
server.use(express.json());

// init express aplication 
const serverPort = 4000;
server.listen(serverPort, () => {
  console.log(`Server listening at http://localhost:${serverPort}`);
});
server.get('/movies', async (req, res) => {
  const conn = await conexion();
  const genreFilterParams = req.query.genre;
  const sortFilterParams = req.query.sort;
  console.log(`genreFilterParams: ${genreFilterParams}`)
  console.log(`sortFilterParams: ${sortFilterParams}`)


  let selectMovies = 'SELECT * FROM movies';
  const queryParams = [];

  // Si genreFilterParams esta definido, modifica la query y agrega un parametrp
  if (genreFilterParams) {
    selectMovies += ' WHERE genre = ?';
    queryParams.push(genreFilterParams);
  }

  // Si sortFilterParams esta definido, modifica la query
  if (sortFilterParams === 'asc') {
    selectMovies += ' ORDER BY title ASC';
  } else if (sortFilterParams === 'desc') {
    selectMovies += ' ORDER BY title DESC';
  }

  console.log(`selectMovies: ${selectMovies}`)
  console.log(`queryParams: ${queryParams}`)
  const [results] = await conn.query(selectMovies, queryParams);

  res.json({ success: true, movies: results });
});


async function conexion() {
  //defino la ubicacion y datos de BD
  const conn = await mysql.createConnection({
    host: 'sql.freedb.tech',
    user: 'freedb_netflix_admin',
    password: 'avtZ%j!F*Y$u92U',
    database: 'freedb_netflix',
  });
  //me conecto a la BD  definida
  await conn.connect();
  return conn;
}


//Servidor de estaticos. Debe estar al final para que primero se renderice la peticion
server.use(express.static("src/public-movies-images"))
server.use(express.static("src/public-react"))

