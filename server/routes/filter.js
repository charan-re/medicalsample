const db = require('../db/dbconnect');
const config = require('../config/config.json')


async function filter(req,res){
    const email_id = req.body.email_id ;
    const password = req.body.password;

    
    db.query('SELECT * from samples', async function(error, results, fields){
        if(error){
            return res.status(400).json({message:"No Samples Present"})
        }
        else{
            if(results.length>0){
                res.status(200).json(results)
            }
        }
    });
}
module.exports = filter;