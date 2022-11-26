const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
const userContactSchema = new mongoose.Schema({
  usertoken: {
    type: String,
    required: true,
  },

  contacts:[{
    phoneNo: {
      type: String,
      required: true,
        },
    name: {
      type: String,
      required: true,
    },
  }]

});

// generating token
// userSchema.methods.generateAuthToken = async function () {
//   try {
//     // const secretKey = "youthavaeonlaseohlnebdonealmehahveunoaye";
//     const token = await jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
//     // console.log(token);
//     this.tokens.push({ token: token });
//     // this.tokens = this.tokens.concat({token:token});
//     await this.save();
//     return token;
//   } catch (error) {
//     // res.send("The error part" + error);
//     console.log("the error part" + error.message);
//   }
// };

// Using bcrypt to hash the password
// userSchema.pre("save", async function (next) {
//   if (this.isModified("password")) {
//     this.password = await bcrypt.hash(this.password, 10);
//   }
//   next();
// });

const contact = new mongoose.model("contact", userContactSchema);
module.exports = contact;
