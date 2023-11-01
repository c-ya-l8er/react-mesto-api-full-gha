// const allowedCors = [
//   'https://mesto-c-ya-l8er.nomoredomainsrocks.ru',
//   'http://mesto-c-ya-l8er.nomoredomainsrocks.ru',
//   'https://api.mesto-c-ya-l8er.nomoredomainsrocks.ru',
//   'http://api.mesto-c-ya-l8er.nomoredomainsrocks.ru',
//   'localhost:3000',
// ];

// module.exports = (req, res, next) => {
//   const { origin } = req.headers;
//   const { method } = req;
//   const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
//   const requestHeaders = req.headers['access-control-request-headers'];
//   if (allowedCors.includes(origin)) {
//     res.header('Access-Control-Allow-Origin', origin);
//   }
//   if (method === 'OPTIONS') {
//     res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
//     res.header('Access-Control-Allow-Headers', requestHeaders);
//     return res.end();
//   }

//   return next();
// };
