const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');
const jwt = require('jsonwebtoken');

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

  api.post('/api/register', async (req, res) => {
    const conex = away conexion();
    const { email, pass } = req.body;
    const selectEmail = 'SELECT *FROM user WHERE email = ?';
    const [emailResult] = await conex.query(selectEmail, [email]);

    if (emailResult.length === 0) {
      const hasshedPassword = await bcrypt.hash(pass, 10);
      const insertUser =
        'INSERT INTO user (email, hashed_password) values (?,?)';
      const [newUser] = await conex.query(insertUser, [email, hasshedPassword]);
      res.status(201).json({ success: true, id: newUser.insertId });
    } else {
      res.status(200).json({ success: false, message: 'usuario ya existe' });
    }
  });

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

