const mongoose = require('mongoose');

const Schema = mongoose.Schema;


const RemoteSchema = new Schema({
    name: { //Remote 1
        type: String,
        required: true,
    },
    type: { // AC DTH
        type: String,
        required: true,
    },
    brand: { //LG Samsung Daikin
        type: String,
        required: true
    },
    commands: { // SWING , ON , OFF
        type: Schema.Types.Mixed,
        required: true
    }
},
    { timestamps: true }
)


module.exports = mongoose.model('Remotes', RemoteSchema);