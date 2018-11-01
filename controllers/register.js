const { Api, JsonRpc, JsSignatureProvider } = require('eosjs');
const fetch = require('node-fetch');
const { TextDecoder, TextEncoder } = require('text-encoding');
// 这里多了一个new，只是为了避免webstorm语法警告而已。
const registerModel = new require('../models/register');
// 设置一个管理员账号，用于创建账号的，这个账号一定是存在并且有足够的EOS在里面的。
const admin = 'tmd555555555';
// 账号的私钥
const privateKey = "5KX4fnaQWhc6Coz9uqk9GWkjiA8q8R8ditSTDjKcHqsHCwnhJpR";
const signatureProvider = new JsSignatureProvider([privateKey]);
const rpc = new JsonRpc('http://junglehistory.cryptolions.io:18888', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });

exports.register = async (req, res) => {
  try{
    const result = await api.transact({
      actions: [{
        account: 'eosio',
        name: 'newaccount',
        authorization: [{
          actor: admin,
          permission: 'active',
        }],
        data: {
          creator: admin,
          name: req.body.username,
          newact:req.body.username,
          owner: {
            threshold: 1,
            keys: [{
              key: req.body.publicKey,
              weight: 1
            }],
            accounts: [],
            waits: []
          },
          active: {
            threshold: 1,
            keys: [{
              key: req.body.publicKey,
              weight: 1
            }],
            accounts: [],
            waits: []
          },
        },
      }, {
        account: 'eosio',
        name: 'buyrambytes',
        authorization: [{
          actor: admin,
          permission: 'active',
        }],
        data: {
          payer: admin,
          receiver: req.body.username,
          bytes: 3000,
        },
      }, {
        account: 'eosio',
        name: 'delegatebw',
        authorization: [{
          actor: admin,
          permission: 'active',
        }],
        data: {
          from: admin,
          receiver: req.body.username,
          stake_net_quantity: '1.0000 EOS',
          stake_cpu_quantity: '1.0000 EOS',
          transfer: false,
        }
      }]
    }, {
      blocksBehind: 3,
      expireSeconds: 30,
    });

    // 合约运行成功后把结果发给前端。
    res.send(JSON.stringify(result))

  }catch(err){
    // 如果运行失败，把错误信息返回给前端。并且退出函数。
    if(!!err.json){
      res.send(JSON.stringify(err.json));
    }else{
      res.send(JSON.stringify(err));
    }
    return;
  }

  // 如果运行成功，把新用户信息存入数据库。
  await registerModel.create({
    username: req.body.username,
    publicKey: req.body.publicKey,
    creator: admin,
    cost:'',
    bytes:3000
  });
};
