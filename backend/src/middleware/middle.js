const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const boardModel = require("../models/boardModel");

exports.authenticationMiddleware = async (req, res, next) =>{
  
    let token = req.headers.authorization
    if (!token) return res.status(401).json({message:"Token not found"})
    jwt.verify(token, "kanbanramban@HAI",async  (err, payload) => {
      if (err) {
        return res.status(401).send();
      } 
        req.user=await User.findById(payload.userId)
        // console.log(req.user);
        if(!req.user){
          return res.status(401).send()
        }
         next();
      })
    };
  
  

exports.authorisationMiddleware = async function (req, res, next) {
  try {
  
    if (req.user != req.body.userId)
      return res.status(403).send({ message: "you are not authorised" });

    // console.log("hello")
    next();
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};


