const Africastalking = require("africastalking");

// Initialize Africa's Talking SDK
const username = "YOUR_USERNAME"; // Replace with your Africa's Talking username
const apiKey = "YOUR_API_KEY"; // Replace with your Africa's Talking API key

const africastalking = Africastalking({ username, apiKey });
const credentials = {
  apiKey: "db5a88fd6e9a96f5465befa1ae35db2735c7a0ac06b9557a2a1211abb2988925",
  username: "Dataisprotected",
};
const AfricasTalking = require("africastalking")(credentials);
const sms = AfricasTalking.SMS;

// Create an instance of the OTP service
const otp = africastalking.OTP;

// Function to send OTP to the user's mobile number
function sendOTP(phoneNumber) {
  return new Promise((resolve, reject) => {
    otp
      .send({ phoneNumber, enqueue: true }) // Set enqueue to true for faster OTP delivery
      .then((response) => {
        console.log("OTP sent successfully!", response);
        resolve(response.token);
      })
      .catch((error) => {
        console.error("Error sending OTP:", error);
        reject(error);
      });
  });
}

// Function to verify the entered OTP
function verifyOTP(phoneNumber, enteredOTP) {
  return new Promise((resolve, reject) => {
    otp
      .verify({ phoneNumber, token: enteredOTP })
      .then((response) => {
        if (response.status === "Success") {
          console.log("OTP verification successful!");
          resolve(true);
        } else {
          console.error("OTP verification failed:", response);
          resolve(false);
        }
      })
      .catch((error) => {
        console.error("Error verifying OTP:", error);
        reject(error);
      });
  });
}

module.exports = { sendOTP, verifyOTP };
