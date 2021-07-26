const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  username:{
    type:String
  },
  password:{type:String,
      // 密码不能查
      // select:false,
      // set(val){
      //     // 密码散列
      //     return require('bcrypt').hashSync(val,10)
      // }
  }

})

module.exports = mongoose.model('User',schema)
