const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Company = require('../models/company');
const amqp = require('amqplib');
const { errorLog, successLog } = require('../../utils/logger');
const { rabbit_url } = require('../../configs');

exports.signup = async (req, res) => {
  try {
    const { company_name, company_type, email, country, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const company = new Company({
      company_name,
      company_type,
      email,
      country,
      password: hashedPassword
    });

    await company.save();
    successLog.info('Company registered successfully!');
    res.status(201).json({ message: 'Company registered successfully!' });
  } catch (e) {
    errorLog.error(e);
    res.status(500).json({ error: 'Error registering company', details: e });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const isMatch = await bcrypt.compare(password, company.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ companyId: company._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ message: 'Login successful', token });
    successLog.info('Login successful');
  } catch (e) {
    errorLog.error(e);
    res.status(500).json({ error: 'Error during login', details: e });
  }
};

const sendEmail = async (email, subject, text) => {
  try {
    const connection = await amqp.connect(rabbit_url);
    const channel = await connection.createChannel();
    const queue = 'email_queue';

    await channel.assertQueue(queue, { durable: true });

    const emailData = { email, subject, text };
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(emailData)), { persistent: true });

    console.log('Email message sent to queue:', emailData);
    await channel.close();
    await connection.close();
  } catch (error) {
    console.error('Error sending email message:', error);
  }
};

exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;

    const company = await Company.findOne({ email });
    if (!company) {
      return res.status(404).json({ error: 'Company not found' });
    }

    const subject = 'Password Reset';
    const text = `Your password is: ${company.password}`;

    await sendEmail(email, subject, text);

    res.json({ message: 'Password reset email sent successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Error during password reset', details: error });
  }
};
