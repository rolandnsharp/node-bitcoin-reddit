var co = require('co');

exports.cole = function(callback) {
    co(function* () {
      try{

      	return yield callback();

      } catch(err) {
        console.error(err);
      }
    }).catch(console.error)

}