const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./routers');
const { SERVER_PORT = 8000 } = process.env;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(routes);

module.exports = () => {
  app.listen(SERVER_PORT, () => {
    console.info('✅', '[SERVER]', 'Server running in port', SERVER_PORT);
  });
};
