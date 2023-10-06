const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error')
const authenticationMiddleWare = async (req , res , next) => {
    const authHeaders = req.headers.authorization ;
    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        throw new CustomAPIError('no token provided' , 401)
    }
    const  token = authHeaders.split(' ')[1]
    try {
        const decoded = jwt.verify(token , process.env.JWT);
        const {id , username} = decoded ;
        req.user = {id , username};
        next()
    } catch (error) {
        throw new CustomAPIError('token inst working any more please sign in again ' , 401)
    }
}
module.exports = authenticationMiddleWare