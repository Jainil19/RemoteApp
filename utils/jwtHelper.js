const jwt = require('jsonwebtoken');


exports.generateToken = (user) => {
    return jwt.sign({ name: user.name, id: user._id, role: user.role }, 
        process.env.TOKEN_KEY,
         { expiresIn: "48h" }
    )
    
}
