const mongoose = require('mongoose');
// 用账号和密码登录连接数据库，eos:eos这里的账号和密码都是eos，
// 地址127.0.0.1，mongodb默认设置了只能本地访问
// faucet，表示连接到faucet这个数据库
// 数据库的账号名是在admin数据库中建立的 所以需要添加 ?authSource=admin
mongoose.connect('mongodb://eos:eos@127.0.0.1/faucet?authSource=admin',{ useNewUrlParser: true } );
mongoose.Promise = global.Promise;

// 设置schema，虽然mongodb是非关系型数据库，但是一般都会给它设置模式
const registerSchema = new mongoose.Schema({
  username:String,
  publicKey:String,
  creator: String,
  cost:String,
  bytes:Number,
  // 创建日期，默认值写成当前时间
  date:{type:Date, default:new Date()}
});

// 设置静态方法，给外外层调用
// 然而外层并未使用
registerSchema.statics.save = async function({username, publicKey, creator, cost, bytes}){
  return this.create({username, publicKey, creator, cost, bytes})
};

// 三个参数，第一个只是schema的名字，可以随便写，第二个是schema对象，第三个是数据库中集合的名字
module.exports = mongoose.model('register', registerSchema, 'faucet');
