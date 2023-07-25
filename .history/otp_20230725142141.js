const africastalking = require("africastalking");
const credentials = {
  apiKey: "db5a88fd6e9a96f5465befa1ae35db2735c7a0ac06b9557a2a1211abb2988925",
  username: "Dataisprotected",
};
const AfricasTalking = require("africastalking")(credentials);
const sms = Africastalking.SMS;

// Function to generate and send OTP to the user's mobile number
function sendOTP(phoneNumber) {
  return new Promise((resolve, reject) => {
    // Generate a random 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Customize the SMS message with the OTP
    const message = `Your OTP for 2FA: ${otp}`;

    // Send the OTP via SMS
    sms
      .send({
        to: [phoneNumber],
        message: message,
      })
      .then((response) => {
        console.log("OTP sent successfully!", response);
        resolve(otp);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        reject(error);
      });
  });
}

module.exports = { sendOTP };
