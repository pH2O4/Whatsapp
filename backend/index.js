const express = require('express');
const venom = require('venom-bot');

const app = express();
const port = 4000;

app.get('/', (req, res) => {
    const config = {
        headless: false
      };
      
      venom.create(config).then((client) => {
        // Sua lógica aqui
      }).catch((erro) => {
        console.log(erro);
      });
      
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
