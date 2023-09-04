const pool = require('../../config/db');


class DbSetting {
  query = async (queryText, values) => {
    let result = '';
    try {
      const client = await pool.connect();
      if(queryText && values){
        console.log(queryText,values);
        result = await client.query(queryText, values);
      }else{
        console.log(queryText)
        result = await client.query(queryText);
      }
      return result.rows;
      client.release();
    } catch (queryError) {
      console.error('Query Error:', queryError);
      throw queryError; 
    }
  }
}

module.exports = DbSetting;
