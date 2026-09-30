const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "dayasri90@gmail.com",
        pass: "zlvnluuncxkimntd"
    }
});

module.exports = transporter;