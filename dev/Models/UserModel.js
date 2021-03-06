var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Schema = mongoose.Schema;
var jwt = require('jsonwebtoken');

var userSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
})

userSchema.pre('save', function(next){
  var user = this;
  bcrypt.hash(user.password, 10, function(err, hash){
    if (err) {
      return next(err);
    }
    user.password = hash;
    next();
  })
});

userSchema.statics.authenticate = function (username, password, callback) {
  User.findOne({ username: username })
    .exec(function (err, user) {
      if (err) {
        return callback(err)
      } else if (!user) {
        var err = new Error('User not found.');
        err.message = 'User not found';
        err.status = 401;
        return callback(err);
      }

      bcrypt.compare(password, user.password, function (err, result) {
        if (result === true) {
          //create token to be used for authentication
          const token = jwt.sign({
            id: user.id,
            username: user.username
          }, 'superstrongsecretkeyforuserauth');
          return callback(null, token);
        } else {
          return callback(err);
        }
      })
    });
}

userSchema.methods.speak = function() {
  console.log('Hello, I am in the database... I think');
}

var User = mongoose.model('User', userSchema);

module.exports = User;
