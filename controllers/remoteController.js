const db = require('./../models');

/**
 * @method GET
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.getAllRemotes = async (req, res, next) => {
    try {
        let remotes;
        if (req.user.role != 'admin') {
            remotes = await db.remoteModel.find({ createdBy: req.user.id })
        } else {
            remotes = await db.remoteModel.find()
        }

        // findOne({_id: req.paramsid})
        // console.log(req.user);
        res.status(200).json({ status: "success", message: "Found Remotes", remotes })

    } catch (err) {
        console.log(err);
        res.status(500).json({ "message": err })
    }

}

exports.getRemote = async (req, res, next) => {
    try {

    } catch (err) {

    }

}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.createRemote = async (req, res, next) => {
    try {
        const { name, type, brand, commands } = req.body;
        const createdBy = req.user.id;
        const remote = await db.remoteModel.create({ name: name, type: type, brand: brand, commands: commands, createdBy: createdBy });
        res.status(201).json({ status: 'success', message: 'Created successfully', remote });

    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.deleteRemote = async (req, res, next) => {
    try {
        /** Find Remote from DB */
        let remote = await db.remoteModel.findById(req.params.id);
        if (!remote)
            res.status(400).json({ status: 'error', message: 'remote not found' });

        /** Check if Requested User has Access to Delete */

        if(req.user.role != 'admin' && req.user.id != remote.createdBy){
            res.status(400).json({ status: 'error', message: 'UnAuthorized' });
        }
        remote = await db.remoteModel.deleteOne({ _id: req.params.id });
        res.status(200).json({ status: "success", message: "deleted Successfully" });

        // if (req.user.role != 'admin') {
        //     if (req.user.id != remote.createdBy) {
        //         return res.status(400).json({ status: 'error', message: 'UnAuthorized' });
        //     } else {
        //         remote = await db.remoteModel.deleteOne({ _id: req.params.id });
        //         return res.status(200).json({ status: "success", message: "deleted Successfully" });
        //     }
        // }
        // remote = await db.remoteModel.deleteOne({ _id: req.params.id });
        // res.status(200).json({ status: "success", message: "deleted Successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}

exports.updateRemote = async (req, res, next) => {
    try {

        /** Find Remote from DB */
        let remote = await db.remoteModel.findById(req.params.id);
        if (!remote)
           return res.status(400).json({ status: 'error', message: 'remote not found' });

        /** Check if Requested User has Access using Jwt */
        if (req.user.id != remote.createdBy && req.user.role != 'admin')
           return res.status(400).json({ status: 'error', message: 'UnAuthorized' });

        /** Santize input */
        let updatedData = req.body;
        // console.log(updatedData); 
        delete updatedData.createdBy
        // console.log(updatedData);

        remote = await db.remoteModel.findByIdAndUpdate({ _id: req.params.id }, updatedData);
        res.status(200).json({ status: 'success', message: 'Updated successfully', remote });
    } catch (err) {
        console.error(err);
        res.status(500).json({ status: "error", message: "Internal Server Error" })
    }
}