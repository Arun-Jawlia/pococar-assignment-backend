const jwt = require('jsonwebtoken')
require('dotenv').config()


const authentication = (req,res,next)=>
{
    const token = req.headers?.authorization?.split(' ')[1]
    try {
        if(token)
        {
            var decoded = jwt.verify(token, process.env.SECRET_KEY)
            req.body.userId = decoded.userId
            next()
        }else{
            res.status(401).send({message: "Unauthorized" })
        }
        
    } catch (error) {
        res.send({message:error})
    }
}

module.exports = { authentication }