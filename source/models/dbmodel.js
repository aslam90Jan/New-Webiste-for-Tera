const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require("../db/conn");

const UserCommentSchema = mongoose.Schema({
  Name: {
    type: String,
    required:true
  },
  Email: {
    type: String,
    required:true
  },
  Phone: {
    type: Number,
    required:true
  },
  Message: {
    type: String,
    required:true
  },
});

const UserRegiesterSchema = mongoose.Schema({
  Userfirstname: String,
  Userlastname: String,
  Userfathername: String,
  Phone: String,
  Email: String,
  Cnic: String,
  Gender: String,
  MartialStatus: String,
  OnJobOrNot: String,
  Country: String,
  Provience: String,
  district: String,
  PermanentAddress: String,
  PostalAddress: String,
  password: String,
  confirmPassword: String,
  passwordHint: String,
  image: String,
  Tokens: [{
    token: {
      type: String,
      required: true,
    },
  }, ],
});

UserRegiesterSchema.methods.setNewtoken = async function () {
  try {
    const token = jwt.sign({
      _id: this._id.toString()
    }, "thisisthekeyOftoken");
    this.Tokens = this.Tokens.concat({
      token: token
    });
    await this.save();
    return token;
  } catch (error) {
    console.log(error.Message, "error of the token ")
  }
}

// to hasning the password of user (Middle ware)
UserRegiesterSchema.pre("save", async function (next) {
  console.log(this.password);
  try {
    this.password = await bcryptjs.hash(this.password, 9);
    this.confirmPassword = undefined;
    next();
  } catch (error) {
    console.log(error);
  }
});

// creating the collections
const UsersComments = mongoose.model("Users_Comment", UserCommentSchema);
const UsersRegiester = mongoose.model("Regiester_user", UserRegiesterSchema);

// export collections
module.exports = {
  UsersComments,
  UsersRegiester,
};