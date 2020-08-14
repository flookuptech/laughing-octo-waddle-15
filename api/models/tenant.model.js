const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const slug = require("url-slug");
const randomstring = require("randomstring");
const contextService = require("request-context");

const slugify = (val, padText) => slug(val, { separator: "_" }) + padText;

const randString = () =>
  randomstring.generate({
    length: 8,
    charset: "alphanumeric",
  });

const tenantSchema = mongoose.Schema(
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
      companyName: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 50,
        unique: true,
        required: [true, "Company name is required"],
      },
      companyEmail: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, "Company email-id  is required"],
        validate: [validator.isEmail, "Invalid company email-id provided"],
      },
    },
    workspace: {
      type: String,
      trim: true,
      required: [true, "Tenant workspace cannot be empty"],
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
      required: [true, "Tenant role is required"],
      enum: {
        values: ["admin"],
        message: "Tenant role can be `admin` only",
      },
    },
    userType: {
      type: String,
      minlength: 3,
      enum: {
        values: ["client"],
        message: "Tenant type can be `client` only.",
      },
      required: [true, "Tenant type is required"],
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

tenantSchema.pre("validate", async function (next) {
  this.workspace = slugify(this.companyDetails.companyName, "_t");
  this.registeredBy = contextService.get("req.user._id");
  next();
});

tenantSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

tenantSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      userDetails: this.userDetails,
      companyName: this.companyDetails.companyName,
      workspace: this.workspace,
      userRole: this.userRole,
      userType: this.userType,
    },
    process.env.CACB_JWT_PRIVATEKEY
  );
  return token;
};

const Tenant = mongoose.model("Tenants", tenantSchema);

module.exports = {
  tenantSchema,
  Tenant,
};
