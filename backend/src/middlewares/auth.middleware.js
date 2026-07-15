// middleware roles
// request ke ander jo bhi data aata hai sab read kar sakte hai
//request ke ander jo data aata hai uss modify bhi kar sakte hai
// response bhi send kar skte hai
const jwt = require("jsonwebtoken")

async function authArtist (req, res, next) {
    const  token = req.cookies.token
        
        if(!token) {
            return res.status(401).json({
                message: "unauthorised"
            })
        }
        try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        if (decoded.role !== "artist") {
            return res.status(403).json({
                message: "You don't have access"
            })
        }

        req.user = decoded

         // req ek middleware se aage forward karne ke liye
        next() 

} catch (err) {
    console.log(err)
    return res.status(401).json({
        message: "unauthorised"
    })
}
}

async function authUser (req, res, next) {
    const  token = req.cookies.token
        
        if(!token) {
            return res.status(401).json({
                message: "unauthorised"
            })
        }
        try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
        if (decoded.role !== "user") {
            return res.status(403).json({
                message: "You don't have access"
            })
        }

        req.user = decoded

        next() 

} catch (err) {
    console.log(err)
    return res.status(401).json({
        message: "unauthorised"
    })
}
}

async function authBoth(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized"
        });
    }

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            message: "Unauthorized"
        });

    }
}

module.exports = {authArtist, authUser, authBoth}