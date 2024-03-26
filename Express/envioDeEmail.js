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


app.post('/sendEmail', upload.single('file'), (req, res) => {

  const request = req.body;

  const transport = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: '587',
    secure: false,
    auth: {
      user: 'felipe.silva@cmrcia.com.br',
      pass: 'Mimo2018'
    }
  });


  transport.sendMail({
    from: 'felipe.silva@cmrcia.com.br',
    to: 'felipe.silva@cmrcia.com.br',
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
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});