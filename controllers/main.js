const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-error')
const login = async (req , res) => {
    const {username , password} = req.body;
    if(!username || !password){
        throw new CustomAPIError('please provide username and password' , 400)
    }
    const id = new Date().getDate()
    const token = jwt.sign({id , username} , process.env.JWT,{expiresIn:'30d'})
    res.status(200).json({msg : 'user created ' ,token});
};
const dashboard = async (req , res) => {
    const authHeaders = req.headers.authorization ;
    if(!authHeaders || !authHeaders.startsWith('Bearer ')){
        throw new CustomAPIError('no token provided' , 401)
    }
    const  token = authHeaders.split(' ')[1]
    try {
        const decoded = jwt.verify(token , process.env.JWT)
        const LuckyNum = Math.floor(Math.random() * 1000)
        res.status(200).json({msg:`hello ${decoded.username}` , secret: `your secret num is ; ${LuckyNum}`});
    } catch (error) {
        throw new CustomAPIError('token inst working any more please sign in again ' , 401)
    }
};



module.exports = {
    login , dashboard
}