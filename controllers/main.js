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
    const user = req.user ;
    const LuckyNum = Math.floor(Math.random() * 1000)
    res.status(200).json({msg:`hello ${user.username}` , secret: `your secret num is ; ${LuckyNum}`});
};



module.exports = {
    login , dashboard
}