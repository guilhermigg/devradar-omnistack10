const axios = require('axios');
const Dev = require('../models/Dev');
const StringToArray = require('../utils/StringToArray');
const { findConnections, sendMessage } = require('../websocket')

module.exports = {
    async index(req, res){
        const devs = await Dev.find();
        return res.json(devs);
    },

    // Armazenar Dados
    async store(req, res){
        const { github_username, latitude, longitude, techs } = req.body; // Github username
        const apiRes = await axios.get(`https://api.github.com/users/${github_username}`);
        const { name = login , avatar_url, bio } = apiRes.data;
        const techsArray = StringToArray(techs)

        let dev = await Dev.findOne({ github_username });
        if(!dev){  
            const location = {
                type: 'Point',
                coordinates: [longitude, latitude]
            };
        
            const dev = await Dev.create({ 
                github_username,
                name,
                avatar_url,
                bio,
                techs: techsArray,
                location
            });
            
            // Filtrar as conexões que estão no máximo há 10km de distância
            // e que o novo Dev tenha pelo menos uma das tecnologias filtradas
            const sendSocketMessageTo = findConnections(
                { latitude, longitude },
                techsArray,
            )
        
            sendMessage(sendSocketMessageTo, 'new-dev', dev);
        }else{
            return res.json({'error':'dev already registered'});
        }
        return res.json(dev);
    },
}


    

