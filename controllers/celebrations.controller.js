const Celebration = require("../models/Celebration.model")

module.exports.getCelebrations = (req, res, next) => {
    Celebration.find()
    .then((celebrations) => res.json(celebrations))
    .catch(next);
};

module.exports.createCelebration = (req, res, next) => {
    console.log(req.body)
    Celebration.create(req.body)
    .then((createdCelebration) => res.json(createdCelebration))
    .catch((error) => {
        if( error.errors.date) {
            res.json({"errorMessage": error.errors.date.properties.message})
        } else {
            res.json({"errorMessage": error.errors.client.properties.message})
        }
    });
};

module.exports.getUserCelebrations = (req, res, next) => {
    const { userId } = req.params
    Celebration.find({ client: userId })
    .then((userCelebrations) => res.json(userCelebrations))
    .catch(next);
};