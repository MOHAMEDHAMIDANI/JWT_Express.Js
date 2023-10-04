




const login = async (req , res) => {
    const {username , password} = req.body;
    console.log(username , password)
    res.status(200).send('fake login / register route')
};
const dashboard = async (req , res) => {
    const LuckyNum = Math.floor(Math.random() * 1000)
    res.status(200).json({msg:'hello' , secret: `your secret num is ; ${LuckyNum}`});
};



module.exports = {
    dashboard,login
}