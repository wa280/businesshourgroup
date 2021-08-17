const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.port || 3000
// View engine setup
app.engine('handlebars', exphbs({defaultLayout: 'main',extname:'.handlebars'}));
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

{/*app.get('/', (req, res) => {
  res.render('contact');
});*/}
app.use('/',require('./routes/index'))

app.post('/send', (req, res) => {
  const output = `
    <p>You have a new contact request</p>
    <h3>Contact Details</h3>
    <ul>  
      <li>Name: ${req.body.name}</li>
      <li>Company: ${req.body.company}</li>
      <li>Email: ${req.body.email}</li>
      <li>Phone: ${req.body.phone}</li>
    </ul>
    <h3>Message</h3>
    <p>${req.body.message}</p>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: 'mail.lotusdreammaker.co.zw',
    port: 465,
    greetingTimeout : 1000 * 100,
    secure: true, // true for 465, false for other ports
    auth: {
        user: 'chigoveratinoonga@gmail.com', // generated ethereal user
        pass: 'wahta1313'  // generated ethereal password
    },
    tls:{
      rejectUnauthorized:false
    }
  });

  // setup email data with unicode symbols
  let mailOptions = {
      from: 'chigoveratinoonga@gmail.com', // sender address
      to: 'danielmushongahande@gmail.com', // list of receivers
      subject: 'business hour group', // Subject line
      text: 'business hour group', // plain text body
      html: output // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          return console.log(error);
      }
      console.log('Message sent: %s', info.messageId);   
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

      res.render('contact', {msg:'Email has been sent'});
  });
  });

app.listen({port: PORT}, () => console.log('Server started...'));