const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = 3000;

const credentials = {
  apiKey: "a414454121d1eabf0bad8d1126a27c9a9e71bb2cbd55418029819c973bed9bba",
  username: "Dataissafe",
};
const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;
let otp = "";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/", (req, res) => {
  const { phoneNumber, text } = req.body;

  console.log("wwwwwww");
  console.log(otp, text);
  if (text === "") {
    console.log("eeee");

    response = `CON Welcome 
        1. sign in`;
  } else if (text === "1") {
    sendsms();
    response = `CON Type in the OTP sent to your phone number`;
  } else if (text !== "1*" + otp) {
    response = `END Invalid input. Try again`;
  } else if (text === "1*" + otp) {
    response = `CON you have successfully signed in!Do you want your parcel delivered? 
    1.yes
    2.no
    `;
  }else if (text === "1*" + otp + "*1") {
    console.log(Text 
    response = `CON select your location
    1. Nairobi
    2. Mombasa`;
  } 

  function sendsms() {
    const AfricasTalking = require("africastalking")(credentials);
    const sms = AfricasTalking.SMS;
    otp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(otp);

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
    return otp;
  }

  // Print the response onto the page so that our gateway can read it
  res.set("Content-Type: text/plain");

  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
