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


//for the pie chart
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

// for the map 
app.get('/api/csv-data/map/:category', (req, res) => {

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
      for( let [k, v] of countryCounts.entries()){
        if ( k === "United States")
          countryCounts.set("United States of America", countryCounts.get(k))
      }
      countryCounts.delete("United States")
      const data = Array.from([...countryCounts.entries()].sort(
                              (a, b) => b[1] - a[1]).slice(0,5));
      res.json(data);
    });

});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

/*
Top 8 Category
Entertainment : 241
Music : 202
People & Blogs : 132
Gaming : 94
Comedy : 69
Film & Animation : 46
Education : 45
Howto & Style : 40
News & Politics : 26
Science & Technology : 17
Shows : 13
Sports : 11
Pets & Animals : 4

*/