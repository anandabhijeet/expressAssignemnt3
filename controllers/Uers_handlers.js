var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
const Users = require("../models/User-schema");

require("dotenv").config();

exports.register = (req, res) => {
  var newUser = new Users(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.save(function (err, user) {
    if (err) {
      return res.status(400).send({
        message: err,
      });
    } else {
      user.hash_password = undefined;
      return res.json(user);
    }
  });
};

exports.sign_in = (req, res) => {
  Users.findOne(
    {
      email: req.query.email,
    },
    function (err, user) {
      if (err) throw err;
      if (!user || !user.comparePassword(req.query.password)) {
        return res
          .status(401)
          .json({
            message: "Authentication failed. Invalid user or password.",
          });
      }
      return res.json({
        token: jwt.sign(
          { email: user.email, _id: user._id },
          process.env.ACCESS_TOKEN_SECRET
        ),
      });
    }
  );
};

exports.findAllUsers = async (req, res) => {
 
  const all_users = await Users.find();
  console.log(req.headers['authorization'])
  res.status(200).json({
    status: "success",
    message: "connected",
    data: {
      all_users,
    },
  });
};


exports.findUserById = async (req, res) => {
  try {
    const user_id = req.query.id;
    const user = await Users.findById(user_id);
    res.status(200).json({
      message: "successful",
      data: {
        user,
      },
    });
  } catch (error) {
    res.send(error.message);
  }
};

exports.updateUser = async (req, res) => {
  try {
    const filter = {
      id: req.query.id,
    };
    const update = req.body;
    const updated_doc = await Users.findOneAndUpdate(filter, update, {
      new: true,
    });
    res.status(200).json({
      message: "updated",
      data: {
        updated_doc,
      },
    });
  } catch (error) {
    res.send(error.message);
  }
};

// exports.deleteUser = async (req, res) => {
//   try {
//   } catch (error) {
//     res.send(error.message);
//   }
// };
