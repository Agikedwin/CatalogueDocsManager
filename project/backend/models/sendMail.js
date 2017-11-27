const nodemailer = require('nodemailer');



module.exports.sendMail =function(emailDetails){
  console.log("sending mail.....");
  console.log(emailDetails);
  
  var transporter = nodemailer.createTransport({
  service: 'gmail',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
  auth: {
    user: 'agikedwin@gmail.com',
    pass: 'edvinag73'
  }
});
 //to: 'bettkipp@gmail.com ,agikedwin@gmail.com',
var mailOptions = {
  from: 'agikedwin@gmail.com',
  to: 'agikedwin@gmail.com, '+emailDetails.email+' ',
  subject: 'System login credentials',
  text: ' Username: '+emailDetails.username+' ,  Password :   '+emailDetails.password+' '
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
}

