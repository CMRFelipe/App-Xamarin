const express = require('express');
const multer = require('multer');
const storage = multer.memoryStorage()
const nodemailer = require('nodemailer');
const upload = multer({ storage: storage });
const app = express();
const cors = require('cors')

const fs = require('fs');

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));



app.post('/sendEmail', upload.single('file'), async (req, res) => {

  const request = req.body;

  const transport = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: '587',
    secure: false,
    auth: {
      user: 'suporte_ti@cmrcia.com.br',
      pass: '#@t1suP2022@'
    }
  });

  try {
    await transport.sendMail({
      from: 'suporte_ti@cmrcia.com.br',
      to: request.destinatario,
      subject: request.assunto,
      text: request.mensagem,
      attachments: [
        {
          filename: req.file.originalname,
          content: req.file.buffer,
        }
      ]
    });
    res.send('File uploaded successfully');

  } catch (error)
  {
    console.error('Erro ao enviar e-mail:', error);
    
    res.status(500).send('Erro ao enviar o e-mail.');
  }

});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});