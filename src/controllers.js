const axios = require('axios');
const { parse } = require('node-html-parser');


const parseTemplate = async (fullhost, config_name, path) => {
  const configResult = await axios.get(`${fullhost}/configs/${config_name}.json`);
  const config = configResult.data;

  if (!path) {
    path = config.template;
  }

  const htmlResult = await axios.get(`${fullhost}/templates/${path}`);
  const html = htmlResult.data;
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

  return root.toString();
};

const pathController = (req, res) => {
  const { path } = req.params;
  const hostname = req.hostname;

  res.send(parseTemplate(hostname, path));
};

const indexController = (req, res) => {
  const hostname = req.hostname.replace(/\W/g, '_');
  const fullhost = `${req.protocol}://${req.host}`
  parseTemplate(fullhost,hostname).then(r => res.send(r));
};
const health = (req, res) => {
  res.send('Ok.');
};

module.exports = {
  pathController,
  indexController,
  health
};
