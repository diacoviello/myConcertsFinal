const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

const UserSchema = new Schema({
    email: { 
        type: String, 
        required: true, 
        unique: true,
      },
    password: { 
      type: String, 
      required: true, 
    },
    Events: [
      {
        type: Schema.Types.ObjectId,
        ref: "Events"
      }
    ],
    pastevents: [
      {
        type: Schema.Types.ObjectId,
        ref: "PastEvents"
      }
    ]
});

UserSchema.methods = {
  checkPassword: function (inputPassword) {
    return bcrypt.compareSync(inputPassword, this.password)
  },
  hashPassword: plainTextPassword => {
    return bcrypt.hashSync(plainTextPassword, 10)
  }
}
// refactor code to work using bcrpyt in mongoose
UserSchema.pre("save", function(next) {
  console.log("UserSchema.pre('save'): ", this)
  if (!this.password) {
    console.log("no password!")
    next()
  } else {
    console.log("pre saved");
    this.password = this.hashPassword(this.password)
    next()
  }
})

const User = mongoose.model("User", UserSchema)

module.exports = User;