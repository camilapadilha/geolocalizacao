const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');


module.exports = {
    async index(request, response) {
        const { latitude, longitude, techs } = Request.query;

        const techsArray = parseStringAsArray(techs);
        console.log(techsArray);

        const devs = await Dev.find({
            techs: {
                techs: {
                    $in: techsArray,
                },
                location: {
                    $near: {
                        $geometry: {
                            typr: 'Point',
                            coordinates: [longitute, latitude]
                        },
                        $maxDistance: 10000,
                    }
                },
            },
        })

        return response.json({ devs });
    }
}