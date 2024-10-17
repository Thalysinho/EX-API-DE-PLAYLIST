const express = require('express');
const playlistsRouter = require('./routes');
const app = express();

//JSON >> Objeto JavaScript
app.use(express.json());

//APi ROUTERS
app.use('/api/playlists', playlistsRouter);

//Config. PORT.
const PORT = process.env.PORT || 3000;
app.listen(PORT, ()=> console.log(`Server Started... http://localhost:${PORT}/`));
