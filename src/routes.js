const express = require('express');
const PlayListController = require('./controllers/controller');
const playlistsRouter = express.Router();

playlistsRouter.get('/', PlayListController.GetAllPL) //get all
playlistsRouter.get('/:id', PlayListController.GetPLid) //get :id
playlistsRouter.post('/', PlayListController.PostPL) //post playlist
playlistsRouter.delete('/:id', PlayListController.deletePL)//delet playlist
playlistsRouter.put('/:id', PlayListController.PutPL)//put playlist
playlistsRouter.post('/:id/musics', PlayListController.postMusics)//post musics
playlistsRouter.delete('/:playlistId/musics/:musicId', PlayListController.deletMusics)//delet musics
module.exports = playlistsRouter