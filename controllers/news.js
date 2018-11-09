const newsModel = new require('../models/news');

exports.query = async (req, res) => {
  // console.log('req',req.query);
  const result = await newsModel.query(req.query);
  // console.log(result);
  res.send(JSON.stringify(result))
};

exports.createNews = async (req, res) => {
  const result = await newsModel.createNews(req.body);
  res.send(JSON.stringify(result))
};

exports.updateNews = async (req, res) => {
  let {password, _id, ...doc} = req.body;
  password = null;
  if(!_id){
    res.send('请输入文章id')
  }else if(Object.keys(doc).length === 0){
    res.send('无修改数据')
  }
  const result = await newsModel.updateNews(_id, doc);
  res.send(JSON.stringify(result));
};

exports.removeNews = async (req, res) => {
  if(!req.body._id){
    res.send('请输入文章id')
  }
  const result = await newsModel.removeNews(req.body._id);
  res.send(JSON.stringify(result));
};
