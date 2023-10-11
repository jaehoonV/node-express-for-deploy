module.exports = {
    isOwner: function (req, res) {
      if(req.session){
        if (req.session.is_logined) {
          return true;
        } else {
          return false;
        }
      }else{
        return false;
      }
    },
    
    isMaster: function (req, res) {
      if(req.session){
        if (req.session.is_master) {
          return true;
        } else {
          return false;
        }
      }else{
        return false;
      }
    },
  
    getUseremail: function (req, res) {
      if(req.session){
        if (req.session.email) {
          return req.session.email;
        }
      }
    },
  
    getUsername: function (req, res) {
      if(req.session){
        if (req.session.username) {
          return req.session.username;
        }
      }
    }
  }