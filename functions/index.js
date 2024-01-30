/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const functions = require("firebase-functions");
const nodemailer = require("nodemailer");

const smtpConfig = {
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "jd@wedevz.io",
    pass: "JDevil@39902",
  },
  tls: {
    ciphers: "SSLv3",
  },
};

const transporter = nodemailer.createTransport(smtpConfig);
exports.sendEmail = functions.https.onCall((data, context) => {
  const { name, email, extra } = data;
  const shortName =
    name.indexOf(" ") > 0 ? name.slice(0, name.indexOf(" ")) : name;
  const mailOptions = {
    from: "Jonathan Daniel <jd@wedevz.io>",
    to: email,
    subject: `${shortName}, thank you for your message!`,
    html: `<div>
        <p>Hi ${shortName}!</p>
        <p>
          Just letting you know I received your message, and I'm currently looking into it and will get back to you with a response as soon as possible.
        <br>
          If you need anything else in the meantime, feel free to reach out.
        </p>
        <p>
        Thanks again!
        <br>
        Jonathan
        </p>
      </div>`,
  };

  return transporter
    .sendMail(mailOptions)
    .then(() => {
      return { success: "Mail sent" };
    })
    .catch((error) => {
      return { error: `Sending failed: ${error}` };
    });
});
