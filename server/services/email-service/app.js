const amqp = require('amqplib');
const nodemailer = require('nodemailer');
const { rabbit_url, node_email, node_pass } = require('./configs');

console.log("email service start")

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: node_email,
        pass: node_pass
      }
    });

    const mailOptions = {
      from: node_email,
      to: email,
      subject,
      text
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// const startConsumer = async () => {
//   const connection = await amqp.connect(rabbit_url);
//   const channel = await connection.createChannel();
//   const queue = 'email_queue';

//   await channel.assertQueue(queue, { durable: true });

//   console.log(`Waiting for messages in ${queue}...`);
//   channel.consume(
//     queue,
//     async (msg) => {
//       if (msg !== null) {
//         const emailData = JSON.parse(msg.content.toString());
//         console.log('Received:', emailData);

//         const { email, subject, text } = emailData;
//         await sendEmail(email, subject, text);

//         channel.ack(msg);
//       }
//     },
//     { noAck: false }
//   );
// };

// startConsumer().catch((error) => {
//   console.error('Error in Email Service:', error);
// });
