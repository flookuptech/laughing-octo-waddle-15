const mongoose = require("mongoose");
const { generateRandNumber } = require("../utils/randNumber.util");
const contextService = require("request-context");

// const con = require("../utils/reqContext.util");

function dateFormatter(val) {
  if (!val) return val;
  return val.split("/").reverse().join("-");
}

const invoiceSchema = mongoose.Schema(
  {
    userRemarks: {
      tdsRate: {
        type: String,
        trim: true,
        default: "none",
      },
      remittanceCurrency: {
        type: String,
        trim: true,
        default: "none",
      },
      remittanceNature: {
        type: String,
        trim: true,
        default: "none",
      },
      purposeCode: {
        type: String,
        trim: true,
        default: "none",
      },
      taxPaid: {
        type: String,
        trim: true,
        default: "none",
      },
      trc: {
        type: String,
        trim: true,
        default: "none",
      },
      clientRemarks: {
        type: String,
        trim: true,
        default: "none",
      },
    },
    trackingNumber: {
      type: Number,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "complete"],
    },
    isTranscationComplete: {
      type: Boolean,
      default: false,
    },
    userId: {
      type: String,
    },
    partyName: {
      type: String,
      trim: true,
      default: null,
    },

    invoiceLink: {
      type: String,
      trim: true,
      required: true,
    },
    invoiceCount: {
      type: Number,
    },
    ackNumber: {
      type: Number,
      trim: true,
      default: null,
    },
    udin: {
      type: String,
      trim: true,
      default: null,
    },
    cbLink: {
      type: String,
      trim: true,
      default: null,
    },
    caLink: {
      type: String,
      trim: true,
      default: null,
    },
    xmlLink: {
      type: String,
      trim: true,
      default: null,
    },
    textFrom15CB: {
      agreementBetween: {
        type: String,
        trim: true,
      },
      nameOfBeneficiaryRemittance: {
        type: String,
        trim: true,
      },
      country: {
        type: String,
        trim: true,
      },
      currency: {
        type: String,
        trim: true,
      },
      amtPayForeign: {
        type: Number,
        trim: true,
      },
      amtPayIndian: {
        type: Number,
        trim: true,
      },
      propDateRemittance: {
        type: Date,
        trim: true,
        set: dateFormatter,
      },
      natureOfRemittance: {
        type: String,
        trim: true,
      },
      taxLiability: {
        type: Number,
        trim: true,
      },
      amtTdsIndian: {
        type: Number,
        trim: true,
      },
      amtRemittanceAfterTds: {
        type: Number,
        trim: true,
      },
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

invoiceSchema.pre("save", function (next) {
  // db = contextService.get("request:user.db");
  this.trackingNumber = generateRandNumber(8, "numeric");
  next();
});

// const userDb = mongoose.connection.useDb();

const Invoice = mongoose.model("Invoices", invoiceSchema);

module.exports = Invoice;
