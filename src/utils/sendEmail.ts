import nodemailer from "nodemailer";
import config from "../config";

export const sendEmail = async () => {
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
    to: "ahmedashik18k@gmail.com",
    subject: "Hello !",
    text: "Hello ki khobor? Password bhule gecho?", // plain‑text body
    html: "<b>Hello world?</b>", // HTML body
  });
};
