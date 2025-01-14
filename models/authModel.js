const { Schema, model } = require("mongoose");
const Joi = require("joi");
const gravatar = require("gravatar");

const schema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },

  avatarUrl: {
    type: String,
    default: function () {
      return gravatar.url(this.email, {}, true);
    },
  },
  verify: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
    required: [true, "Verify token is required"],
  },
});

const schemaSignup = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),
});
const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const schemaResend = Joi.object({
  email: Joi.string().email().required(),
});
const User = model("user", schema);

module.exports = { User, schemaSignup, schemaLogin, schemaResend };
