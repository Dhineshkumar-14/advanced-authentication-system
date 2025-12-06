import {
  PASSWORD_RESET_REQUEST_TEMPLATE,
  PASSWORD_RESET_SUCCESS_TEMPLATE,
  VERIFICATION_EMAIL_TEMPLATE,
  WELCOME_EMAIL,
} from "./emailTemplates.js";
import transporter from "./nodemailer.config.js";

export const sendVerificationEmail = async (email, verificationToken) => {
  const axios = require("axios");

const token = "YOUR_TOKEN"; 
const phoneNumberId = "YOUR_PHONE_NUMBER_ID";

async function sendWhatsApp() {
  try {
    const response = await axios.post(
      `https://graph.facebook.com/v18.0/${phoneNumberId}/messages`,
      {
        messaging_product: "whatsapp",
        to: "91XXXXXXXXXX",
        type: "text",
        text: { body: "Hello! This is a WhatsApp message from Node.js 🚀" }
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Message sent:", response.data);
  } catch (error) {
    console.error("Error:", error.response?.data || error.message);
  }
}

sendWhatsApp();

};

export const sendWelcomeEmail = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: '"Dhineshkumar" <dhineshkumar.velayudham@gmail.com>',
      to: email,
      subject: "welcome email",
      html: WELCOME_EMAIL,
    });
    console.log("Welcome email sent successfully", response);
  } catch (error) {
    console.error(`Error sending welcome email`, error);
    throw new Error(`Error sending welcome email: ${error}`);
  }
};

export const sendPasswordResetEmail = async (email, resetURL) => {
  try {
    const response = await transporter.sendMail({
      from: '"Dhineshkumar" <dhineshkumar.velayudham@gmail.com>',
      to: email,
      subject: "Reset your password",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL),
    });
    console.log("PasswordReset email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset email`, error);

    throw new Error(`Error sending password reset email: ${error}`);
  }
};

export const sendResetSuccessEmail = async (email) => {
  try {
    const response = await transporter.sendMail({
      from: '"Dhineshkumar" <dhineshkumar.velayudham@gmail.com>',
      to: email,
      subject: "Password Reset Successful",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE,
      category: "Password Reset",
    });

    console.log("Password reset email sent successfully", response);
  } catch (error) {
    console.error(`Error sending password reset success email`, error);

    throw new Error(`Error sending password reset success email: ${error}`);
  }
};
