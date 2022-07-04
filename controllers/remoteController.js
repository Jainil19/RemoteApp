const db = require('./../models');


exports.getRemote = async (req, res, next) => {
    
    const remote = await db.remoteModel.findOne()

}