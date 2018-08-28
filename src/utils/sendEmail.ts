import MailGun from "mailgun-js";

const mailGunClient = new MailGun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: process.env.MAILGUN_DOMAIN || ""
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "parkbustour@gmail.com",
    to: "parktemp@naver.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking <a href="http://nuber.com/verification/${key}/">here</a>`;
  return sendEmail(emailSubject, emailBody);
};
