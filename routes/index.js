const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register');

// 保留get请求，测试服务器成功开启
router.get('/', function(req, res) {
  res.send('you shall not pass')
});

// 增加一个post请求的路由，用于处理注册请求
router.post('/',registerController.register);

module.exports = router;
