const express = require('express');
const cors = require('cors');
const fs = require('fs');
const csv = require('csv-parser');

const app = express();
const port = process.env.PORT || 3000;
const csvFilePath = '/Users/aungphyo/desktop/Fall2023/CSC805/dataSet/Global_YouTube_Statistics_v1.csv';


//app.use(express.json());
app.use(cors());


app.get('/api/csv-data', (req, res) => {

    const data = [];

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {
        if(row.Country === 'United States')
            data.push(row);
      })
      .on('end', () => {
        res.json(data);
      });

});


//raw data of total countries
app.get('/api/csv-data/countries/:category', (req, res) => {

    const countryCounts = new Map();
    const category = req.params.category

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on('data', (row) => {

        if(row.category === category){
            if(countryCounts.has(row.Country)){
                countryCounts.set(row.Country, countryCounts.get(row.Country) + 1)
            }
            else{
                countryCounts.set(row.Country, 1)
            }
        }
       
      })
      .on('end', () => {
        const data = Array.from([...countryCounts.entries()].sort(
                                (a, b) => b[1] - a[1]).slice(2,8));
        res.json(data);
      });

});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
