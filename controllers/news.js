const newsModel = new require('../models/news');

exports.query = async (req, res) => {
  const result = await newsModel.query(req.query);
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
  newsModel.updateNews(_id, doc).then(
    result => res.send(JSON.stringify(result))
  ).catch(
    ()=>res.send(JSON.stringify('输入出错，请检查输入字段'))
  );
};

exports.removeNews = async (req, res) => {
  if(!req.body._id){
    res.send('请输入文章id')
  }
  newsModel.removeNews(req.body._id).then(
    result => res.send(JSON.stringify(result))
  ).catch(
    ()=>res.send(JSON.stringify('输入出错，请检查输入字段'))
  );
};
