import * as utils from '../utils';
import request from 'request';

// logout
export function logout(res) {
  res.clearCookie('tmid', {domain: '.tmup.com', path: '/'})
  setUser({});
  res.redirect('/');
}

export function userInfo(res) {
  var tokenBody = utils.getToken();
  request.get({
    url: 'https://auth.tmup.com/v1/user',
    headers: {
      'Authorization' : `bearer ${tokenBody['access_token']}`
    }
  }, (err, response, body) => {
    const user = JSON.parse(body);
    if (user.exception) {
      logout(res);
    }
    res.status(200).json(user);
  });
}

export function teamList(res) {
  var tokenBody = utils.getToken();
  request.get({
    url: 'https://auth.tmup.com/v1/user/teams',
    headers: {
      'Authorization' : `bearer ${tokenBody['access_token']}`
    }
  }, (err, response, body) => {
    const teams = JSON.parse(body);
    if (teams.exception) {
      logout(res);
    }
    res.status(200).json(teams);
  });
}
