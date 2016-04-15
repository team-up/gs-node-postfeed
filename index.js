import express from 'express';
import path from 'path';
import exphbs from 'express-handlebars';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import request from 'request';
import qs from 'querystring';
import * as teamup from './api/teamup';
import * as utils from './utils'

const app = express();

// client_id와 secret은 필요에 따라 발급받아 수정하시면 됩니다.
const oauth = {
  client_id: 'test-client98',
  client_secret: 'm4bj3vbwkafywrk9'
}
// redirectUri를 맞게 수정해서 사용하시면 됩니다.
const rediretUri = 'http://localhost.com:3000/login-success';

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  const tokenBody = utils.getToken();
  if (utils.isEmptyObject(tokenBody)) {
    res.redirect(`https://auth.tmup.com/oauth2/authorize?client_id=${oauth['client_id']}&response_type=code&redirect_uri=${redirectUri}`);
  }
  else {
    res.render('menu', tokenBody);
  }
});
app.get('/login-success', (req, res) => {
  const code = req.query['code'];
  request.post({
    url: 'https://auth.tmup.com/oauth2/token',
    form: Object.assign(oauth, {
      grant_type: 'authorization_code',
      code: code
    })
  }, (err, response, body) => {
    const tokenBody = JSON.parse(body);
    utils.setToken(tokenBody);
    res.redirect('/');
  });
});
app.get('/logout', (req, res) => {
  teamup.logout(res);
});
app.get('/user-info', (req, res) => {
  teamup.userInfo(res);
});
app.get('/teams', (req, res) => {
  teamup.teamList(res);
});

app.listen(3000, () => {
  console.log('server started!');
});
