const nodemailer = require('nodemailer');
const htmlToText = require('nodemailer-html-to-text').htmlToText;

const transporter = nodemailer.createTransport({
  direct: true,
  host: 'smtp.gmail.com',
  port: 465,
  auth: { 
    user: process.env.MAIL_USERNAME, 
    pass: process.env.MAIL_PASSWORD
  },
  secure: true
});
transporter.use('compile', htmlToText());

const templates = {
  sponsorRegister: (data) => ({
    to: data.email,
    subject: 'Spoonsor.com: Bilgilendirme',
    html: `
      <a href='https://www.spoonsor.com'><strong>Spoonsor.com</strong></a>'a hoşgeldiniz!
      <br />
      Bize ${data.name} olarak katıldığınız için teşekkür ederiz. Hesabınıza logo ve kısa bir açıklama ekleyerek tanınabilirliğinizi arttırabilirsiniz. Etkinliklerden mesaj gelince sizi mail yoluyla bilgilendireceğiz.
      <br />
      Giriş yapıp hesabınızı düzenlemek ve mesajlarınızı görmek için aşağıdaki linke tıklayın:
      <br />
      <a href='https://www.spoonsor.com'>https://www.spoonsor.com</a>
    `,
  }),
  etkinlikRegister: (data) => ({
    to: data.email,
    subject: 'Spoonsor.com: Bilgilendirme',
    html: `
      <a href='https://www.spoonsor.com'><strong>Spoonsor.com</strong></a>'a hoşgeldin!
      <br />
      Bize ${data.name} olarak katıldığın için teşekkür ederiz. Artık sitemizdeki markalara ulaşabilmen için tek bir adım kaldı.
      <br />
      Hesabını aktifleştirmek için aşağıdaki linke tıkla:
      <br />
      <a href='https://www.spoonsor.com/activate'>https://www.spoonsor.com/activate</a>
    `,
  }),
  sendMessage: (data) => ({
    to: data.to.email,
    subject: `Spoonsor.com: ${data.from.name} size bir mesaj gönderdi!`,
    html: `
      <a href='https://www.spoonsor.com'><strong>Spoonsor.com</strong></a>'da yeni bir mesajınız var! Görmek ve cevap vermek için giriş yapın.
      <br />
      <strong>Gönderen:</strong> ${data.from.name} <${data.from.email}>
      <br />
      <strong>Mesaj:</strong> 
      <blockquote>${data.message}</blockquote>
    `
  })
};

module.exports = (data, template, callback) => {
  const mailOptions = {
    from: process.env.MAIL_USERNAME,
    ...templates[template](data)
  };
  transporter.sendMail(mailOptions, callback);
};