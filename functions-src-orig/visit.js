//Got problem when deploy on netlify functions

//on local work if npm install pg pg-native

require('dotenv').config();
const { Pool } = require('pg');

exports.handler = function(event, context, callback) {
  
  const con = new Pool({
    connectionString: process.env.DB_URI,
    ssl: true,
  });

  const query = (sql, params) => con.connect()
    .then(client => client.query(sql, params)
      .then((res) => {
        client.release();
        return Promise.resolve(res);
      })
      .catch((err) => {
        client.release();
        return Promise.reject(err);
      }));

  const insertVisits = async (event) => {
    const sqlV = `INSERT INTO log_visits (user_id, user_agent, ip_address) VALUES ('1', '${event.headers['user-agent']}', '${event.headers['x-forwarded-for']}') RETURNING id`;
    return await query(sqlV);
  };

  //console.log(event);
  console.log('user-agent', event.headers['user-agent']);
  console.log('x-forwarded-for', event.headers['x-forwarded-for']);
  console.log(context);
  //const {identity, user} = context.clientContext;
  insertVisits(event)
  .then(res => {
    console.log(res.rows[0].id);
    callback(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*",
        "Access-Control-Allow-Headers": "Content-Type"
      },
      body: JSON.stringify({ visits: res.rows[0].id }),
    });
  });
  

}