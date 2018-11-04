require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });

const visitsSchema = new mongoose.Schema({
    user_id:  {type: Number, required: true},
    user_agent: {type: String, required: true},
    ip_address: {type: String, required: true}
  },
  { timestamps: true }
);
let VisitsLog = mongoose.model('VisitsLog', visitsSchema);
  
exports.handler = function(event, context, callback) {
//console.log(process.env.DB_URI);

  let v = new VisitsLog({
    user_id:  '1',
    user_agent: event.headers['user-agent'],
    ip_address: event.headers['x-forwarded-for']
  });
  
  v.save((err, data) => {
    if (!err) {
      VisitsLog.estimatedDocumentCount({}, (err, c) => {
        callback(null, {
          statusCode: 200,
          headers: {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Headers": "Content-Type"
          },
          body: JSON.stringify({ visits: c })
        });
      });
    } else {
      console.error(err);
      throw new Error(err);
    }
    
  });


  
  //console.log(event);
  // console.log('user-agent', event.headers['user-agent']);
  // console.log('x-forwarded-for', event.headers['x-forwarded-for']);
  // console.log(context);
  //const {identity, user} = context.clientContext;
};