const jwt = require('jsonwebtoken');
const {badRequest} = require('../errors/index')
const login = async (req , res) => {
    const {username , password} = req.body;
    if(!username || !password){
        throw new badRequest('please provide username and password')
    }
    const id = new Date().getDate()
    const token = jwt.sign({id , username} , process.env.JWT,{expiresIn:'30d'})
    res.status(200).json({msg : 'user created ' ,token});
};
const dashboard = async (req , res) => {
    const user = req.user ;
    const LuckyNum = Math.floor(Math.random() * 1000)
    res.status(200).json({msg:`hello ${user.username}` , secret: `your secret num is ; ${LuckyNum}`});
};



module.exports = {
    login , dashboard
}