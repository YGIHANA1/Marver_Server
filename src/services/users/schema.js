const { Schema } = require("mongoose")
const mongoose = require("mongoose")
const v = require("validator")



const UserSchema = new Schema(
    {
    
      email: {
        type: String,
        required: true,
        lowercase: true,
        validate: {
          validator: async (value) => {
            if (!v.isEmail(value)) {
              throw new Error("Email is invalid")
            } else {
              const checkEmail = await UserModel.findOne({ email: value })
              if (checkEmail) {
                throw new Error("Email already existant!")
              }
            }
          },
        },
      },
      password:{type:String,required:true},
     
      professions: Array,
    },
    { timestamps: true }
  )


     UserSchema.post("validate", function (error, doc, next) {
        if (error) {
          error.httpStatusCode = 400
          next(error)
        } else {
          next()
        }
      })
      
      UserSchema.post("save", function (error, doc, next) {
        if (error.name === "MongoError" && error.code === 11000) {
          error.httpStatusCode = 400
          next(error)
        } else {
          next()
        }
      })
      
      const UserModel = mongoose.model("User", UserSchema)
      
      module.exports = UserModel
           