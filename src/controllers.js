const axios = require('axios');
const { parse } = require('node-html-parser');

const { PORT=8000 } = process.env

const parseTemplate = async (fullhost, config_name, path) => {
  const config = await axios.get(`${fullhost}/configs/${config_name}.json`);

  /*if (!path) {
    path = config.template;
  }

  const html = fs.readFileSync(`${__dirname}/templates/${path}`, 'utf-8');
  const root = parse(html);
  for (const {query, replacement} of config.replaces) {
    const elms = root.querySelectorAll(query);
    for (const elm of elms) {
      if (typeof replacement === "string") {
        elm.set_content(replacement);
      } else {
        const { method, params } = replacement;
        elm[method](...params);
      }
    }
  }

  return root.toString();*/

  return config.data
};

const pathController = (req, res) => {
  const { path } = req.params;
  const hostname = req.hostname;

  res.send(parseTemplate(hostname, path));
};

const indexController = (req, res) => {
  const hostname = req.hostname;
  const fullhost = `${req.protocol}://${req.host}:${PORT}`
  parseTemplate(fullhost,hostname).then(r => res.send(r)) ;
};
const health = (req, res) => {
  res.send('Ok.');
};

module.exports = {
  pathController,
  indexController,
  health
};
