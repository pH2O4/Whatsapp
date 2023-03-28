const express = require('express');
const venom = require('venom-bot');
const cors = require('cors');

const app = express();
const port = 4000;

var client;

app.use(cors());

venom.create().then((cl) => {
  client = cl;
  console.log('Client conectado com sucesso.');
}).catch((erro) => {
  console.log(erro);
});

app.get('/', (req, res) => {
  res.send('Server running.');
});

app.get('/sendToOpenChat', async (req, res) => {
  try {
    const chats = await client.getAllChats();
    var teste = chats.map(c => c.lastReceivedKey)
    const chat = teste.map(c => c.fromMe);
   // let chat = await chats.reverse().find(c => c && c.lastMsg && c.lastMsg.fromMe !== undefined && c.lastMsg.fromMe === true);
    console.log(chat)
    if (!chat) throw new Error('Não há chats abertos.');

    const message = req.query.message || 'Sua mensagem aqui.';
    await client.sendText(chat.id._serialized, message);
    console.log('Mensagem enviada com sucesso.');
    return res.send('Mensagem enviada com sucesso.');
  } catch (error) {
    console.error(`Erro ao enviar a mensagem: ${error}`);
    return res.status(500).send(`Erro ao enviar a mensagem: ${error}`);
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
