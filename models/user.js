const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// passport
// const passportLocalMongoose = require("passport-local-mongoose")

const Session = new Schema({
  refreshToken: {
    type: String,
    default: "",
  },
})


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
    Event: [
      {
        type: Schema.Types.ObjectId,
        ref: "Event"
      }
    ],
    PastEvent: [
      {
        type: Schema.Types.ObjectId,
        ref: "PastEvent"
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

const User = mongoose.model("user", UserSchema)

module.exports = User;