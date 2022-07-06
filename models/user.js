const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name:{
        type: 'string',
        required: true
    },
    email:{
        type: 'string', 
        required: true,
        unique: true
    },
    password:{
        type: 'string',
        required: true,
        // selected: false 
    }
},
{timestamps: true}
)
userSchema.set('toJSON', {
    transform: function(doc, ret, opt) {
        delete ret['password']
        return ret
    }
})
module.exports = mongoose.model('Users',userSchema);