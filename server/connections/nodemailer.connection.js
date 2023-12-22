const config = require('dotenv').config();
const nodemailer = require("nodemailer");

const emailSender = async (name, email) => {
  let transporter = nodemailer.createTransport({
    host: config.parsed.SMTP_HOST,
    port: config.parsed.SMTP_PORT,
    requireTLS: true,
    secure: false, // true for 465, false for other ports
    auth: {
      user: config.parsed.SMTP_USERNAME,
      pass: config.parsed.SMTP_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Jonathan Daniel" <jdwork2021@gmail.com>', // sender address
    to: `${name}, ${email}`, // list of receivers
    subject: `${name}, thanks for reaching out`, // Subject line
    text: `Thanks for visiting my portfolio today! I'm thrilled of the fact you've reached out for me as I'm currently actively searching for my next big challenge in the industry. This might be a good opportunity to share with you that I'm looking forward to discuss with you on any development positions currently or might become available.`, // plain text body
    html: `
    <h3>Hi ${name}! Thanks for visiting my portfolio today!</h3>
    <p>
      I'm thrilled of the fact you've reached out for me as I'm currently actively searching for my next big challenge in the industry.
    </p>
    <p>
      This might be a good opportunity to share with you that I'm looking forward to discuss with you on any available development positions <br/> that are currently available or might become available in the near future.
    </p>
    <p>
      I truly appreciate you leaving your email address, and I'd be happy to stay in touch.
    </p>
    <p>
      Sincerely,
      <br/>
      Jonathan Daniel
    </p>
    `, // html body
  });

  return info.accepted.length ? true : false;
};

module.exports = emailSender;
