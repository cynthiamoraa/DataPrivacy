const express = require("express");
const bodyParser = require("body-parser")

const app = express();

const PORT = 3000;

const credentials = {
  apiKey: "a414454121d1eabf0bad8d1126a27c9a9e71bb2cbd55418029819c973bed9bba",
  username: "Dataissafe",
};
const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const { phoneNumber, text } = req.body;

  console.log("wwwwwww");

  if (text === "") {
    console.log(text);

    response = `CON Welcome 
        1. sign in`;
  }else if (text === "1") {
    sendsms();
    response = `CON Type in the OTP sent to your phone number`;
  }
  
  function sendsms() {
   
    const AfricasTalking = require("africastalking")(credentials);
    const sms = AfricasTalking.SMS;
  
    const message = `Your OTP for 2FA: ${otp}`;

    // Send the SMS
    const options = {
      to: phoneNumber,
      message: message,
    };

    sms
      .send(options)
      .then((response) => {
        console.log("SMS sent successfully:", response);
      })
      .catch((error) => {
        console.error("Error sending SMS:", error);
      });
 
  }
     if (text === otp) {
       console.log("wwwwwww");

       response = `END you have successfully signed in `;
     } else {
       response = `END Invalid input`;
     }




  // Print the response onto the page so that our gateway can read it
  res.set("Content-Type: text/plain");

  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
