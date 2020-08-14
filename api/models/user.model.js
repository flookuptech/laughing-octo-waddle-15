/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const slug = require("url-slug");
const randomstring = require("randomstring");

const slugify = (val, padText) => slug(val, { separator: "_" }) + padText;

const randString = () =>
  randomstring.generate({
    length: 8,
    charset: "alphanumeric",
  });

const userSchema = new mongoose.Schema(
  {
    userDetails: {
      firstName: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 255,
        required: [true, "First name is required"],
        validate: [validator.isAlpha, "Invalid first name provided"],
      },
      lastName: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 255,
        required: [true, "Last name is required"],
        validate: [validator.isAlpha, "Invalid last name provided"],
      },
      email: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        required: [true, "User email-id  is required"],
        validate: [validator.isEmail, "Invalid email provided"],
      },
      phone: {
        type: String,
        trim: true,
        required: [true, "User email-id  is required"],
        validate: [validator.isNumeric, "Invalid phone number provided"],
      },
      designation: {
        type: String,
        trim: true,
        minlength: 2,
        maxlength: 50,
        required: [true, "Designation is required"],
        validate: [validator.isAlphanumeric, "Invalid designation provided"],
      },
    },
    companyDetails: {
      name: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 50,
        unique: true,
        required: [true, "Company name is required"],
      },
      email: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Company email-id  is required"],
        validate: [validator.isEmail, "Invalid company email-id provided"],
      },
    },
    workspace: {
      type: String,
      unique: true,
      trim: true,
      required: [true, "User workspace cannot be empty"],
      validate: [validator.isSlug, "Invalid workspace slug"],
    },
    password: {
      type: String,
      minlength: 5,
      required: [true, "Please provide a password"],
      select: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    userRole: {
      type: String,
      minlength: 3,
      required: [true, "User role is required"],
      enum: {
        values: ["admin", "client", "super"],
        message: "User role can be either `admin` or `client`",
      },
      validate: {
        validator(el) {
          return el === "super" && this.userType === "root";
        },
        message: "Only user with role as `super` can have `root` access",
      },
    },
    userType: {
      type: String,
      minlength: 3,
      enum: {
        values: ["client", "root"],
        message: "User type can be either `root` or `client`",
      },
      required: [true, "User type is required"],
      validate: {
        validator(el) {
          return el === "root" && this.userRole === "super";
        },
        message: "Root user role must be `super`",
      },
      // registeredBy: {
      //   type: String,
      //   minlength: 3,
      //   required: [true, "User email-id  is required"],
      // },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
    versionKey: false,
    timestamps: true,
  }
);

userSchema.pre("validate", async function (next) {
  if (this.userType === "root" && this.userRole === "super") {
    this.workspace = "15cacb_main_db";
  } else if (this.userType === "client" && this.userRole === "admin") {
    this.workspace = slugify(this.companyDetails.name, "_t");
  } else if (this.userType === "client" && this.userRole === "client") {
    this.workspace = "CONTEXT";
  }

  next();
});

// tenantSchema.pre("save", function (next) {
//   if (!this.isModified("password") || this.isNew) {
//     return next();
//   }

//   this.passwordChangedAt = Date.now() - 1000;
//   next();
// });

userSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      userDetails: this.userDetails,
      companyName: this.companyName,
      workspace: this.workspace,
      userRole: this.userRole,
      userType: this.userType,
    },
    process.env.CACB_JWT_PRIVATEKEY
  );
  return token;
};

const User = mongoose.model("Users", userSchema);

module.exports = User;
