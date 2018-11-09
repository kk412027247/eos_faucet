const express = require('express');
const router = express.Router();
const registerController = require('../controllers/register');
const newsController = require('../controllers/news');
const certificationController = require('../controllers/certification');

// 保留get请求，测试服务器成功开启
router.get('/', function(req, res) {
  res.send('you shall not pass')
});

// 增加一个post请求的路由，用于处理注册请求
router.post('/',registerController.register);

//查询新闻
router.get('/news', newsController.query);

// 增加新闻
router.post('/news',certificationController.certification, newsController.createNews);

// 更改新闻
router.post('/updateNews',certificationController.certification, newsController.updateNews);


// 删除新闻
router.post('/removeNews', certificationController.certification, newsController.removeNews);



module.exports = router;
