const express = require('express');
const mongoose = require('mongoose');
const { errors, celebrate, Joi } = require('celebrate');
const cors = require('./middlewares/cors');
// const cors = require('cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/index');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NOT_FOUND = require('./errors/NotFound');

const httpRegex = /^((ftp|http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-/])*)?/;

const { PORT = 3001, MONGO_URL = 'mongodb://localhost:27017/mestodb' } = process.env;

const app = express();
app.use(cors);
// app.use(
//   cors({
//     origin: [
//       'https://mesto-c-ya-l8er.nomoredomainsrocks.ru',
//       'https://api.mesto-c-ya-l8er.nomoredomainsrocks.ru',
//       'localhost:3000',
//     ],
//     allowedHeaders: ['Content-Type', 'Authorization'],
//     credentials: true,
//   }),
// );
app.use(express.json());
app.use(requestLogger);

app.post(
  '/signin',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  login,
);

app.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
      avatar: Joi.string().regex(httpRegex),
      email: Joi.string().email().required(),
      password: Joi.string().min(8).required(),
    }),
  }),
  createUser,
);

app.use(auth);
app.use(router);
app.use(errorLogger);
app.use(errors());

app.use((req, res, next) => {
  next(new NOT_FOUND('Ошибка - 404 Страница не найдена'));
});

app.use((error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const message = statusCode === 500 ? 'Произошла ошибка на стороне сервера' : error.message;
  res.status(statusCode).send({ message });
  next();
});

async function init() {
  await mongoose.connect(MONGO_URL);
  console.log('DB CONNECT');

  await app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
}
init();
