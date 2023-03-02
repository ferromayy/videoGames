const {Genres, Videogame} = require('../db');
const axios = require ('axios');
const {API_KEY} = process.env;

const getApiInfo = async () => {

  const apiUrl = await axios.get(
    `https://api.rawg.io/api/games?key=${API_KEY}`
  );
  const apiInfo = await apiUrl.data.results?.map((game) => {
    return {
      id: game.id,
      name: game.name,
      descripcion: game.description,
      plataformas: game.platforms?.map((game) => game.platform.name),
      imagen: game.background_image,
      fechaDeLanzamiento: game.released,
      rating: game.rating,
      genero: game.genres.map((game) => game.name),
    };
  });
  return apiInfo;
};

const getBdInfo = async ()=>{
    return await Videogame.findAll({
        include: {
            model: Genres,
            attributes: ['name'],
            through: {
                attributes: [],
            },

        }
});
}

const getAllVideogames = async ()=> {
    const apiInfo = await getApiInfo();
    const dbInfo = await getBdInfo(); 
   const totalInfo = apiInfo.concat(dbInfo)
 return totalInfo
};

// const getGameById = async (id)=>{
//     try{
//         if(!isNaN(id)){
//             const bringApi = await axios.get( `https://api.rawg.io/api/games/${id}?key=${API_KEY}`)
//             const bringApiInfo = {
//                 id: bringApi.id,
//                 name: bringApi.name,
//                 descripcion: bringApi.description,
//                 plataformas: bringApi.platforms?.map((game) => game.platform.name),
//                 imagen: bringApi.background_image,
//                 fechaDeLanzamiento: bringApi.released,
//                 rating: bringApi.rating,
//                 genero: bringApi.genres
//             };
//             return bringApiInfo;
//         };



//     }catch(error){
//         return error;

//     }
// }





module.exports = {
getAllVideogames,
}
