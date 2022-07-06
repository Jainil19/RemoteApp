const db = require('./../models');

/**
 * @method GET
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getRemote = async (req, res, next) => {
    try{
        const remotes = await db.remoteModel.find()
        // findOne({_id: req.paramsid})
        console.log(req.user);
        res.status(200).json({
            "status":"success",
            data:remotes
        })
    
    }catch(err){
        console.log(err);
        res.status(500).json({"message":err})
    }
    
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.postRemote = async (req, res, next) => {
    try{
        const remote = await db.remoteModel.create(req.body);
        res.status(201).json({remote});
    }catch(err){
        console.log(err);
        es.status(500).json({"message":err})
    }
}