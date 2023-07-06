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
    }
  }