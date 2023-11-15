import React, {useState, useEffect} from 'react';

const Data = () => {

    const [data, setData] = useState([]);
   
    useEffect(() => {
        fetch('http://localhost:3000/api/csv-data/countries') // Replace with your API endpoint
        .then((response) => response.json())
        .then((data) => {
            setData(data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
        });
        console.log(data)
    }, []);

   
    return (
        <div>
          <h2>Fetched Data</h2>

          {/* <ul>
            {data.map((item) => (
              <li key={item.rank}>{item.Country}</li>
            ))}
          </ul> */}

          <ul>
            {data.map(([key, value]) => (
              <li key={key}>{key} : {value}</li>
            ))}
          </ul>
          
        </div>
    );
};

export default Data;