/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const tenantSchema = new mongoose.Schema(
  {
    name: {
      firstName: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: [true, 'First name is required'],
      },
      lastName: {
        type: String,
        minlength: 3,
        maxlength: 255,
        required: [true, 'Last name is required'],
      },
    },
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: [true, 'User email-id  is required'],
      validate: [validator.isEmail, 'Invalid email provided'],
    },
    // contact: {
    //   type: String,
    //   minlength: 3,
    //   maxlength: 50,
    //   required: [true, 'Contact number is required'],
    // },
    // designation: {
    //   type: String,
    //   minlength: 3,
    //   maxlength: 50,
    //   required: [true, 'Designation is required'],
    // },
    companyName: {
      type: String,
      minlength: 3,
      maxlength: 50,
      required: [true, 'Company name is required'],
    },
    // orgEmail: {
    //   type: String,
    //   minlength: 3,
    //   maxlength: 50,
    //   required: [true, "Organization' email-id is required"],
    // },
    // panNumber: {
    //   type: String,
    //   minlength: 3,
    //   maxlength: 50,
    //   required: [true, 'Pan number is required'],
    // },
    password: {
      type: String,
      minlength: 5,
      required: [true, 'Please provide a password'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      minlength: 5,
      required: [true, 'Please add confirmation password'],
      validate: {
        validator(el) {
          return el === this.password;
        },
        message: 'Password do not match',
      },
    },
    passwordChangedAt: {
      type: Date,
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    role: {
      type: String,
      minlength: 3,
      required: [true, 'User role is required'],
      enum: {
        values: ['admin', 'junior'],
        message: 'User type can be either admin or junior',
      },
      default: 'junior',
    },
    userType: {
      type: String,
      minlength: 3,
      enum: {
        values: ['client', 'owner'],
        message: 'User type can be either client or owner',
      },
      required: [true, 'User type is required'],
    },
    // orgDatabase: {
    //   type: String,
    //   minlength: 3,
    //   maxlength: 255,
    //   required: [true, "Organisation's database name is required"],
    // },

    // registeredBy: {
    //   type: String,
    //   minlength: 3,
    //   maxlength: 255,
    //   required: [true, 'User created by is required'],
    // },
    isActive: {
      type: Boolean,
      default: true,
    },
    dateCreated: {
      type: Date,
      default: Date.now(),
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
    versionKey: false,
  }
);

tenantSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

tenantSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) {
    return next();
  }

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

tenantSchema.methods.checkPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

tenantSchema.methods.changedPassword = function (jwtTimeStamp) {
  if (this.passwordChangedAt) {
    const changeTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return jwtTimeStamp < changeTimeStamp;
  }
  return false;
};

tenantSchema.virtual('fullName').get(function () {
  return this.name.firstName + this.name.lastName;
});

tenantSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

tenantSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      companyName: this.companyName,
    },
    process.env.CACB_JWT_PRIVATEKEY,
    { expiresIn: process.env.CACB_JWT_EXPIRESIN.toString() }
  );
  return token;
};

const Tenant = mongoose.model('Tenant', tenantSchema);

module.exports = Tenant;
