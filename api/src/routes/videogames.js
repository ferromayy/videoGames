const express = require('express');
//  const {Videogame} = require('../db')
const router = express.Router();
const{getAllVideogames} = require('../controllers/controller')



router.get("/", async (req, res) =>{
    try{
      const {name} = req.query;
     const totalGames = await getAllVideogames();
     if(name){
      const gamesFilter = totalGames.filter((e)=>{
          e.name.toLowerCase().include(name.toLowerCase());   
      });
     return res.status(200).json(gamesFilter); 
   }
    return res.status(200).json(totalGames)

    } catch (error) {
      res.status(400).send(error)
    }
    });

    router.get("/:id", async (req, res)=>{
      try{
        const id = req.params 
        const gameByid = await getAllVideogames();
        if(id){
          const gameId = await gameByid.find((e)=>{
            e.id == id
          });

          if(Object.keys(data).length){
            res.status(200).json(gameId)
          } else {
            res.status(404).send('no se encontro ese personaje')
          }

        };

      }catch(error){
        return res.status(400).send(error)

      }
    });

    module.exports = router;