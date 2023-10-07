const jwt = require('jsonwebtoken');
const{UnAuth} = require('../errors/index')
const authenticationMiddleWare = async (req , res , next) => {
    const authHeaders = req.headers.authorization ;
    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        throw new UnAuth('no token provided')
    }
    const  token = authHeaders.split(' ')[1]
    try {
        const decoded = jwt.verify(token , process.env.JWT);
        const {id , username} = decoded ;
        req.user = {id , username};
        next()
    } catch (error) {
        throw new UnAuth('token inst working any more please sign in again')
    }
}
module.exports = authenticationMiddleWare