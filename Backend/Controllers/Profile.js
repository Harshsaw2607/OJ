const dotenv=require('dotenv')
dotenv.config()
const jwt = require('jsonwebtoken')


const Profile = (req,res) => {
    const token = req.cookies.token;
    // console.log("REQ = ",req.cookies)
    if (!token) return res.status(401).json({ message: 'Unauthorized' });

    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Unauthorized' });

        const user = { id: decoded.id, username: decoded.email };
        res.json({ user });
    });
}

const Logout = (req,res) => {
    res.clearCookie('token');
    res.json({ message: 'Logout successful' });
}

module.exports={Profile,Logout}