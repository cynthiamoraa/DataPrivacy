const express = require("express");
const bodyParser = require("body-parser")

const app = express();

const PORT = 3000;

const credentials = {
  apiKey: "d88ce3b236fb756932836cdcdb5c92c65b0745614b21554fb01b561ff7c7ccb1",
  username: "Dataisveryprotected",
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
        1. book an appointment
        2. emergency services`;
  } else if (text === "1") {
    response = `CON pick a location
        1. Nairobi
        2. Mombasa
        3. Kisumu `;
  } else if (text === "1*1") {
    sendsms();
    response = `CON These are the available slots
        1.Monday 10am
        2.Tuesday 11am
        3.Wednesday 12pm
        4.Thursday 1pm
        5.Friday 2pm
        6. Saturday 3pm `;
  }

  function sendsms() {
   
    const AfricasTalking = require("africastalking")(credentials);
    const sms = AfricasTalking.SMS;
    const otp = Math.floor(100000 + Math.random() * 900000);
    cons
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


  if (text === "2") {
    console.log("wwwwwww");
    const credentialss = {
      apiKey: "##",
      username: "###",
    };

    // Initialize the SDK
    const AfricasTalkings = require("africastalking")(credentialss);

    // Get the voice service
    const voice = AfricasTalkings.VOICE;

    function makeCall(phoneNumber1) {
      const options = {
        callFrom: "+254730731029",

        callTo: [phoneNumber1],
      };

      console.log("calling");
      voice.call(options).then(console.log).catch(console.log);
    }

    makeCall(phoneNumber);

    response = `END you will receive a call shortly `;
  }

  // Print the response onto the page so that our gateway can read it
  res.set("Content-Type: text/plain");

  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
