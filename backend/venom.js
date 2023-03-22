const venom = require('venom-bot');

const config = {
  headless: false
};

venom.create(config).then((client) => {
  // Sua lógica aqui
}).catch((erro) => {
  console.log(erro);
});
