const fs = require('fs');
const { parse } = require('node-html-parser');

const parseTemplate = (config_name, path) => {
  const config = require(`${__dirname}/configs/${config_name}.json`);

  if (!path) {
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

  return root.toString();
};

const pathController = (req, res) => {
  const { path } = req.params;
  const hostname = req.hostname;

  res.send(parseTemplate(hostname, path));
};

const indexController = (req, res) => {
  const hostname = req.hostname;

  res.send(parseTemplate(hostname));
};

module.exports = {
  pathController,
  indexController
};
