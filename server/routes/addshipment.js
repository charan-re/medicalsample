const { response } = require("express");
const express = require("express");
const router = express.Router();
const db = require("../db/dbconnect");

router.get('/select', async function (request, response) {
    try {
        let query3Result = await dbQueryFunc3()

        response.send(query3Result)
    } catch (err) {
        console.error(err)
    }


});

router.get("/fetchlocation", async (req, res) => {
    var query = await db.query(
        "SELECT distinct `location_name` FROM `locations`",
        (error, results, fields) => {
            if (error) throw error;
            let options = [];
            for (let element of results) {
                options.push({ value: element.location_name, label: element.location_name });
            }
            console.log(options);
            return res.status(200).json({ options: options });
        }
    );
    console.log(query.sql);
});

router.get("/aliquots/:sample_id", async (req, res) => {
    // console.log(req.params.sample_id);
    var query = await db.query(
      "SELECT distinct `aliquot_id` FROM `aliquots` WHERE `sample_id`=?",
      [req.params.sample_id],
      (error, results, fields) => {
        if (error) throw error;
        // console.log(results);
        let options = [];
        for (let element of results) {
          options.push({ value: element.aliquot_id, label: element.aliquot_id });
        }
        // console.log(options);
        return res.status(200).json({ options: options });
      }
    );
    console.log(query.sql);
  });

// function dbQueryFunc2() {
//     return new Promise(function (resolve, reject) {
//         let query2 = db.query('select distinct location_name from locations', (error, result) => {
//             if (error) {
//                 reject(error)
//             }
//             resolve(result)
//         });
//         console.log(query2.sql);
//     })
// }

function dbQueryFunc3() {
    return new Promise(function (resolve, reject) {
        let query1 = db.query('select s.samples_key,s.sample_id,s.eval,s.type,s.aliquots,s.date from samples s join aliquots a on s.sample_id=a.sample_id', (error, result) => {
            if (error) {
                reject(error)
            }
            resolve(result)
        });
        console.log(query1.sql);
    })
}

module.exports = router;

