const crypto = require('crypto')

// rsa公钥加密方法
function encrypt(data,pubkey) {
  // 注意，第二个参数是Buffer类型
  return crypto.publicEncrypt(pubkey, Buffer.from(data));
}

// rsa私钥解密方法
function decrypt(data,prikey) {
 // 注意，encrypted是Buffer类型
 return crypto.privateDecrypt(prikey, data);
}

//md5 加密
function md5(data,){
  return crypto.createHash('md5').update(data).digest('hex')
}

//md5 加盐后加密,盐值要存起来
function md5salt(data){
  let saltdata = `${data}:${Math.random().toString().slice(2, 5)}`
  return crypto.createHash('md5').update(saltdata).digest('hex')
}
//md5 加盐后解密,
function enmd5salt(data,salt){

}


//sha256 加密
function sha256(data,){
  return crypto.createHash('sha256').update(data).digest('hex')
}

// hmac 加密hash的加盐运算。
function hmac(data,key){
  return crypto.createHmac('sha256',key).update(data).digest('hex')
}

// signature 数字签名
function sign(data,priKey){
  return crypto.createSign('RSA-SHA256').update(data).sign(priKey, 'hex');  //生成签名（私钥加密）
  

}

// signature 数字签名验证
function verify(data,pubKey,signature){
  return crypto.createVerify('RSA-SHA256').update(data).verify(pubKey,signature,'hex'); //验证签名（公钥解密）
}


module.exports = {
  encrypt,
  decrypt,
  md5,
  md5salt,
  sha256,
  hmac,
  sign,
  verify
}