const jwt = require('jsonwebtoken');
const register = require('../models/register');

const auth = async(req,res,next) =>{
    try {
        const token = req.cookies.jwt;
        const userVerify = jwt.verify(token, process.env.SECRET_KEY);
        // console.log(userVerify);
        const user = await register.findOne({_id:userVerify._id});
        // console.log(user)
        req.user = user;
        req.token = token;
        next()
    } catch (error) {
        res.status(401).redirect('/login')
    }
}

// const isAuthenticated = () => {

// };

module.exports = auth