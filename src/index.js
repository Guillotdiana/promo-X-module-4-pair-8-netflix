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


// endpoints
server.get('/movies', async (req, res) => {
  const connDB = await conexion();
  const selectMovies = 'SELECT * FROM movies;';
  const [result] = await connDB.query(selectMovies);
  res.json({success: true,movies:  fakeMovies});
});


//Servidor de estaticos. Debe estar al final para que primero se renderice la peticion
server.use(express.static("./src/movies"))

