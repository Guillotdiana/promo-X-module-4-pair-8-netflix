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
  //query params 
  const genreFilterParams = req.query.genre;
  console.log(genreFilterParams)

  //sql->SELECT 
  let data;
  if (!genreFilterParams){
    const selectMovies = 'SELECT * FROM movies;';
    const [results]= await conn.query(selectMovies);
    data = results;
  } else{
    const selectMovies = 'SELECT * FROM movies WHERE genre = ?;';
    const [results]= await conn.query(selectMovies, [genreFilterParams]);
    data = results;
  }
  res.json({success: true, movies: data});
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
server.use(express.static("src/public-react"))

