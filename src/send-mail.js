const nodemailer = require('nodemailer');

// 创建一个SMTP transporter
let transporter = nodemailer.createTransport({
    host: 'smtp.example.com', // SMTP服务器地址
    port: 587, // SMTP服务器端口，默认为25，如果是SSL连接通常是465
    secure: false, // true表示使用TLS/SSL连接，默认为false
    auth: {
        user: 'your-email@example.com', // 发件人邮箱用户名
        pass: 'your-email-password' // 发件人邮箱密码或授权码
    }
});

// 邮件内容
let mailOptions = {
    from: '"Node.js Sender" <your-email@example.com>', // 发件人
    to: 'receiver@example.com', // 收件人，可以是字符串或数组
    subject: 'Hello ✔', // 邮件主题
    text: 'Hello world?', // 纯文本内容
    html: '<b>Hello world?</b>' // HTML内容
};

// 发送邮件
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // 如果有需要，还可以用info对象做更多事情，比如获取邮件发送状态等
});