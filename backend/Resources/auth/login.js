const Professional = require('../models/Professional');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const login = async(req, res) => {
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(400).send('Missing username or password');
        return;
    }

    const foundUser = await Professional.findOne({
        where: {
            username
        }
    });
    
    if (!foundUser) {
      res.status(401).send("User does not exist with given username!");
      return;
    }

    try {
      const match = await bcrypt.compare(password, foundUser.password);
      if (match) {
        const userInfo = {
            "username": foundUser.username,
            "role": foundUser.profession
        }
        const accessToken = jwt.sign(userInfo, process.env.ACCESS_TOKEN_SECRET, {'expiresIn': '30d'})
        res.status(200).json({accessToken});
      } else {
        res.status(401).send('Username or password is incorrect');
        return;
      }
    } catch (err) {
        res.status(500).send(`error: ${err.message}`);
    }
};

module.exports = login;