var tokenBody = {};
export function setToken(body) {
  tokenBody = body;
}
export function getToken() {
  return tokenBody;
}
export function isEmptyObject(obj) {
  if (obj === null) return true;
  if (obj === undefined) return true;
  if (obj.length > 0) return false;
  if (obj.length === 0) return true;
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      return false;
    }
  }
  return true;
}
