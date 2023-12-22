const emailfn = require('../connections/nodemailer.connection');

class DataController {
  static async returnData(req, res, next) {
    const response = await emailfn(req.body.name, req.body.email);
    if(response){
      res.send(true)
    }
    else {
      res.send(false)
    }
  }
}

module.exports = DataController;
