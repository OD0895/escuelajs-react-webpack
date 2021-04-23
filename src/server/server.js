import express from 'express';
import config from './config';
import webpack from 'webpack';

const { env, port } = config;

const app = express();

if (env === 'development') {
  console.log('Development config');
  // eslint-disable-next-line global-require
  const webpackConfig = require('../../webpack.config');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webPackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const serverConfig = { port: port, hot: true };

  app.use(webpackDevMiddleware(compiler, serverConfig));
  app.use(webPackHotMiddleware(compiler));
}

app.get('*', (req, res) => {
  res.send({ hello: 'express' });
});

app.listen(port, (err) => {
  if(err) console.log(err);
  else console.log(`Server running on port ${port}`);
});