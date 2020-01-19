const Dev = require('../models/Dev');
const StringToArray = require('../utils/StringToArray');

module.exports = {
    async index(req, res){
        // Filtrar por dev's num raio de 10km
        // Filtrar por tecnologias
        const { latitude, longitude, techs } = req.query;
        const techsArray = StringToArray(techs);

        // 
        const devs = await Dev.find({
            techs: {
                $in: techsArray
            },
            location: {
                $near:{
                    $geometry:{
                        type: 'Point',
                        coordinates: [longitude, latitude]
                    },
                    $maxDistance: 10000,
                }
            }
        });
        return res.json({ devs });
    },

    async destroy(req, res){
        await Dev.remove({github_username: req.query['github_username']});
        return res.json({'msg': 'deletado'})
    },
    
}