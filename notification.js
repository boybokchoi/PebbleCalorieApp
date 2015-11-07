var notification = {
  
  vibratePebble : function() {
    var Vibe = require('ui/vibe');
    Vibe.vibrate('long');
  }
};

this.exports = notification;

