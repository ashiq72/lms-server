import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async (to: string, html: string) => {
  // Create a test account or replace with real credentials.
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: config.NODE_ENV === "production", // true for 465, false for other ports
    auth: {
      user: "mdashiquzzaman98@gmail.com",
      pass: "hmlr bukv ancy ripk",
    },
  });
  await transporter.sendMail({
    from: '"Maddison Foo Koch" <mdashiquzzaman28@gmail.com>',
    to,
    subject: "Hello !",
    text: "Reset your password within 10 minutes", // plain‑text body
    html, // HTML body
  });
};
