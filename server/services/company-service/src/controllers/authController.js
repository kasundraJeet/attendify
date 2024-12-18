const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Company = require("../models/company");
const amqp = require("amqplib");
const { errorLog, successLog } = require("../../utils/logger");
const {
  successResponse,
  errorResponse,
  successResponseWithData,
  validationErrorWithData,
} = require("../../utils/responseHandlers");
const { rabbit_url, jwt_token } = require("../../configs");

exports.signup = async (req, res) => {
  try {
    const { name, email, country, password, employees } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const sessionToken = jwt.sign({ email }, jwt_token, { expiresIn: "40m" });
    const sessionExpiry = new Date(Date.now() + 40 * 60 * 1000);

    const company = new Company({
      company_name: name,
      email,
      country,
      number_of_employees: employees,
      password: hashedPassword,
      session_token: sessionToken,
      session_expiry: sessionExpiry,
    });

    await company.save();
    successResponseWithData(
      res,
      "Company registered successfully!",
      sessionToken
    );
    successLog.info("Company registered successfully!");
  } catch (e) {
    console.log(e);
    errorLog.error(e);
    errorResponse(res, "Error registering company");
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email });
    if (!company) {
      return validationErrorWithData(res, "Company not found");
    }

    const isMatch =
      (await bcrypt.compare(password, company.password)) ||
      password == company.password;
    if (!isMatch) {
      return validationErrorWithData(res, "Invalid email or password");
    }

    const sessionToken = jwt.sign({ email }, jwt_token, { expiresIn: "40m" });
    const sessionExpiry = new Date(Date.now() + 40 * 60 * 1000);

    company.session_token = sessionToken;
    company.session_expiry = sessionExpiry;

    await company.save();

    successResponseWithData(res, "Login successful", sessionToken);
    successLog.info("Login successful");
  } catch (e) {
    errorLog.error(e);
    errorResponse(res, "Error during login");
  }
};

const sendEmail = async (email, subject, text) => {
  try {
    const connection = await amqp.connect(rabbit_url);
    const channel = await connection.createChannel();
    const queue = "email_queue";

    await channel.assertQueue(queue, { durable: true });

    const emailData = { email, subject, text };
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(emailData)), {
      persistent: true,
    });

    console.log("Email message sent to queue:", emailData);
    await channel.close();
    await connection.close();
  } catch (e) {
    console.error("Error sending email message:", e);
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const company = await Company.findOne({ email });
    if (!company) {
      return validationErrorWithData(res, "Company not found");
    }

    const subject = "Password Reset";
    const text = `Your password is: ${company.password}`;

    await sendEmail(email, subject, text);

    successResponse(res, "Password reset email sent successfully!");
    successLog.info("Password reset email sent successfully!");
  } catch (e) {
    errorLog.error(e);
    errorResponse(res, "Error during password reset");
  }
};
