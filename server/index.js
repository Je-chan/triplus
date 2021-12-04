require('dotenv').config();

// 필요한 모듈 다운
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { sequelize } = require('./models');
const app = express();
const { Server } = require('socket.io');
const { createServer } = require('http');

// port 80으로 변경
const port = process.env.HTTP_PORT || 4000;

// Router 연결
const adminPage = require('./router/adminPage');
const chattingPage = require('./router/chattingPage');
const loginPage = require('./router/loginPage');
const mainPage = require('./router/mainPage');
const managementPage = require('./router/managementPage');
const mapPage = require('./router/mapPage');
const myPage = require('./router/myPage');
const signupPage = require('./router/signupPage');
const authPage = require('./router/authPage');
const fileManagement = require('./router/fileManagement');
const logout = require('./controller/logout');
const confirmEmail = require('./controller/functions/confirmEmail');
const { IncomingMessage } = require('http');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: [
      'https://localhost:3000',
      'http://localhost:3000',
      'http://localhost',
      'https://triplus.world',
      'https://www.triplus.world',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.use(cookieParser());

app.use('/admin', adminPage);
app.use('/chatting', chattingPage);
app.use('/login', loginPage);
app.use('/main', mainPage);
app.use('/management', managementPage);
app.use('/map', mapPage);
app.use('/my', myPage);
app.use('/signup', signupPage);
app.use('/oauth', authPage);
app.use('/file-management', fileManagement);
app.get('/logout', logout.logout);
app.get('/confirmEmail', confirmEmail.confirmEmail);

app.get('/hello-triplus', (req, res) => {
  res.status(200).send('Hello triplus');
});

// * socket.io 부분
const httpServer = createServer();
const io = new Server(httpServer, {
  cors: {
    origin: [
      'https://localhost:3000',
      'http://localhost:3000',
      'http://localhost',
      'https://triplus.world',
      'https://www.triplus.world',
    ],
    credentials: true,
  },
});

io.on('connection', (socket) => {
  console.log(`connect with id: ${socket.id}`);
});

// 서버 실행할 때, sequelize 실행하여 데이터베이스 생성
sequelize
  .sync({
    force: false,
  })
  .then(() => {
    console.log('데이터베이스 연결 성공');
  })
  .catch((error) => {
    console.log(error);
  });

app.listen(port, () => {
  console.log(`          server listening on ${port}`);
});

httpServer.listen(6000, () => {
  console.log(`          socket server open on ${port}`);
});
