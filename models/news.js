const mongoose = require('mongoose');
mongoose.connect('mongodb://eos:eos@127.0.0.1/faucet?authSource=admin',{ useNewUrlParser: true } );
mongoose.Promise = global.Promise;

const newsSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  date:{type: Date, default: new Date()}
});

newsSchema.statics.query = async function({limit=5, position=0}){
  return this.find({}).sort({date:-1}).skip(Number(position)).limit(Number(limit));
};

newsSchema.statics.createNews = async function({title='',content='',author=''}){
  return this.create({title, content, author})
};

newsSchema.statics.updateNews = async function(_id, doc){
  return this.updateOne({_id:_id},{$set:{...doc}})
};

newsSchema.statics.removeNews = async function(_id){
  return this.remove({_id})
};

module.exports = mongoose.model('mews', newsSchema, 'news');
