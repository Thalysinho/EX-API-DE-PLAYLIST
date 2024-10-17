const playLists = [];

module.exports = {

    //api/playLists  GET ALL Playlists
    GetAllPL: (req, res) => {
        if (playLists.length === 0) 
            return res.json({ message: `no playlist yet.`});
        res.status(202).json(playLists);
    },
    
    //api/playLists/:id  GET:ID Playlist
    GetPLid: (req, res) => {
        const { id } = req.params;//params: "link"
        const playListID = playLists.find(PL => PL.id === parseInt(id))
        if (!playListID) return res.status(404).json({ message: `PlayList not existis.`})     
        res.status(202).json(playListID)
    },
    
    //api/playLists/playList  POST Playlist
    PostPL: (req, res) => {
        const { name, tags, musics} = req.body;//body: json postman
        //Verification "name" has exists
        const PlaylistIndex = playLists.findIndex(playLists => playLists.name === name)
        //Verification if name has exist
        if (PlaylistIndex !== -1)//if name exist = error (FindIndex: Se não encontrar retorna -1)
            return res.status(400).json({ message: `Name already exists.` });
        //Verification if name is string
        if(typeof name !== 'string') return res.status(400).json({ message: `Name must be a string.` });
        //Verification if tag is array
        if (!Array.isArray(tags)) return res.status(400).json({ message: 'Tags must be an array.' })       
        //Verification if music is array
        if (musics && !Array.isArray(musics)) return res.status(400).json({ message: 'Musics must be an array.' });
        //create newPlaylist
        const newPlayList = {
            id: Math.floor(Math.random()*9999999),//
            name: name,
            tags: tags,
            musics: musics ?? []
        }
        playLists.push(newPlayList); //Add to array (newPlayList)
        res.status(201).json(newPlayList); //return status and NewPlalist to view
    },
    
    //api/playLists/:id  PUT Playlist
    PutPL: (req, res) => {
        const { id } = req.params;//params: "link"
        const { name, tags } = req.body;//body: json postman
        const PLIndex = playLists.findIndex(pl => pl.id === parseInt(id));
        if (PLIndex === -1) return res.status(404).json({ message: `Playlist not exists.`});
        if (typeof name === 'string') playLists[PLIndex].name = name;
        if (tags && Array.isArray(tags)) playLists[PLIndex].tags = tags;
        res.status(202).json(playLists[PLIndex])
    },
    
    //api/playLists/:id  DELETE Playlist
    deletePL: (req, res) => {
        const { id } = req.params;//params: "link"
        // Find index of the playlist by ID
        const PlaylistIndex = playLists.findIndex(PL => PL.id === parseInt(id));
        // If playlist doesn't exist, return 404
        if(PlaylistIndex === -1) return res.status(404).json({ message: `Playlist not exists.` });
        // Remove playlist from the original array using splice
        const delPlaylist = playLists.splice(PlaylistIndex, 1);//remove 1 element at the found index]
        res.status(202).json(delPlaylist);
    },

    //api/playlists POST Musics
    postMusics: (req, res) => {
        const { title, year, artist, album } = req.body//body: json postman
        const { id } = req.params//params: "link"
    
        const playlist = playLists.find(pl => pl.id === +id)
    
        if (!playlist) return res.status(404).json({ message: 'playlist not found' })
    
        if (
          typeof title !== 'string' || typeof year !== 'number' ||
          typeof artist !== 'string' || typeof album !== 'string'
        ) {
          return res.status(400).json({ message: 'Invalid format' })
        }
    
        const newMusic = {
          id: Math.floor(Math.random()*9999999),
          title,
          year,
          artist,
          album
        }
    
        playlist.musics.push(newMusic)
    
        res.status(201).json(newMusic)
    },

    //api/playlists/:id  DELET Musics
    deletMusics: (req, res) => {
        
            const { playlistId, musicId } = req.params
            const playlist = playLists.find(pl => pl.id === +playlistId)
        
            if (!playlist) return res.status(404).json({ message: 'playlist not found' })
            
            const musicIndex = playlist.musics.findIndex(music => music.id === +musicId)
        
            if (musicIndex === -1) return res.status(404).json({ message: 'music not found' })
            
            playlist.musics.splice(musicIndex, 1)
            res.status(204).end()
    }

}