const mongoose = require('mongoose');
mongoose.connect('mongodb://eos:eos@127.0.0.1/faucet?authSource=admin',{ useNewUrlParser: true } );
mongoose.Promise = global.Promise;

const registerSchema = new mongoose.Schema({
  username:String,
  publicKey:String,
  creator: String,
  cost:String,
  bytes:Number,
  date:{type:Date, default:new Date()}
});

registerSchema.static.save = async function({username, publicKey, creator, cost, bytes}){
  return this.create({username, publicKey, creator, cost, bytes})
};

module.exports = mongoose.model('register', registerSchema, 'faucet');
