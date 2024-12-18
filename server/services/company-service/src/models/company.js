const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  company_name: { type: String, required: true },
  company_type: { type: String },
  email: { type: String, required: true, unique: true },
  website: { type: String },
  country: { type: String, required: true },
  number_of_employees: { type: String },
  address: { type: String },
  registration_no: { type: String },
  founded_year: { type: Number },
  social_media: { type: Map, of: String },
  status: { type: String, default: "Active" },
  company_logo: { type: String },
  password: { type: String, required: true },
  session_token: { type: String },
  session_expiry: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Company", companySchema);
