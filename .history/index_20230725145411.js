const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const PORT = 3000;

const credentials = {
  apiKey: "db5a88fd6e9a96f5465befa1ae35db2735c7a0ac06b9557a2a1211abb2988925",
  username: "Dataisprotected",
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
      function sendsms() {
        const message = `Your appointment has been booked for `;

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
      sendsms();
    response = `CON pick a location
        1. Nairobi
        2. Mombasa
        3. Kisumu `;
  }

  else if (text === "2") {
    console.log("wwwwwww");
   

    response = `END you will receive a call shortly `;
  }

  // Print the response onto the page so that our gateway can read it
  res.set("Content-Type: text/plain");

  res.send(response);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
