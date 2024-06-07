const express = require('express');
const cors = require('cors');

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
  const connDB = await conexion();
  //query params 
  const genreFilterParams = req.query.genre;
  console.log(genreFilterParams)
  //sql->SELECT 
  const selectMovies = 'SELECT * FROM movies WHERE genre= ?;';
  let data;
  if (genreFilterParams === ""){
    const selectMovies = "SELEST * FROM movies;";
    const [results]= await conn.query(selectMovies,);
    data = results;
  } else{
    const selectMovies = "SELECT * movies WHERE genre = ?;";
    const [results]= await conn.query(selectMovies [genreFilterMovies]);
    data = results;
  }
  res.json({success: true,movies:  fakeMovies});
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
server.use(express.static("./src/movies"))

