const express = require("express");
const bodyParser = require("body-parser");
const otpService = require("./otpService");

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));

// USSD handler
app.post("/ussd", async (req, res) => {
  const { text, phoneNumber } = req.body;
  let responseText = "";

  if (!text) {
    // If no text received, request user's phone number
    responseText =
      "Welcome to the 2FA USSD service.\nPlease enter your phone number (e.g., +2547xxxxxxxx).";
  } else if (!phoneNumber) {
    // If no phone number received, ask again for the phone number
    responseText =
      "Invalid phone number. Please enter your phone number (e.g., +2547xxxxxxxx).";
  } else {
    try {
      // Send OTP to the user's mobile number
      const otp = await otpService.sendOTP(phoneNumber);

      // Save the OTP and phone number in the session for verification
      req.session = { phoneNumber, otp };

      responseText =
        "OTP sent successfully. Please enter the OTP you received:";
    } catch (error) {
      console.error("Error sending OTP:", error);
      responseText = "An error occurred. Please try again later.";
    }
  }

  res.contentType("text/plain").send(responseText);
});

// USSD OTP verification
app.post("/verify", async (req, res) => {
  const { text } = req.body;
  const { phoneNumber, otp } = req.session;
  let responseText = "";

  if (text === otp.toString()) {
    // Verify the entered OTP
    responseText = "OTP verification successful. You are now authenticated!";
  } else {
    responseText = "OTP verification failed. Please try again.";
  }

  res.contentType("text/plain").send(responseText);
});

// Start the server
app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});
