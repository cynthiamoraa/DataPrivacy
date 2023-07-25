

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
