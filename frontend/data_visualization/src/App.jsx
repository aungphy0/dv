import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Data from './Data'
import axios from 'axios';
import PieChart from './PieChart'
import Map from './Map'



function App() {
  
  const [ selectedDataset, setSelectedDataset ] = useState("Entertainment");
  const [ chartData, setChartData ] = useState([]);
  const [ selectedCategory, setSelectedCategory ] = useState();
  const [mapData, setMapData ] = useState([]);
  /*
  useEffect(() => {
    fetch('http://localhost:3000/api/csv-data/countries')
      .then((response) => response.json())
      .then((data) => setChartData(data))
      .catch((error) => console.error("Error fetching data: ", error));

      console.log(chartData)
  }, []);
  */
  
  //////////////// Pie Chart ////////////////
  /*
  useEffect(() => {
    const fetchData = async () => {
       try {
         const response = await axios.get(`http://localhost:3000/api/csv-data/countries/${selectedDataset}`);
         setChartData(response.data || []);
       } catch (error) {
         console.error('Error fetching data:', error);
       }
    };

    fetchData();
 }, [selectedDataset]);

 const handleRadioChange = (e) => {
   setSelectedDataset(e.target.value)
 }

 const dataArray = Array.from(chartData).map(([property, value]) => ({ property, value }));
 */
  //////////////// Pie Chart ////////////////



  ///////////////  Map chart ///////////////
  /*
  const countries = [];

  useEffect(() => {
     const fetchData = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/csv-data/map/${selectedCategory}`);
          setMapData(response.data || []);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
     };

     fetchData();
  }, [selectedCategory]);

  for(let i=0; i<mapData.length; i++) {
    countries.push(mapData[i][0])
    console.log(mapData[i][0] + " : " + mapData[i][1])
  }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };
  */
  ///////////////////// Map Chart ////////////////////////


  return (
    <div className="App">
      {/* <Data /> */}
      {/* <div>
        <label>
          <input
            type="radio"
            value="Entertainment"
            checked={selectedDataset === 'Entertainment'}
            onChange={handleRadioChange}
          />
          Entertainment
        </label>
        <label>
          <input
            type="radio"
            value="Music"
            checked={selectedDataset === 'Music'}
            onChange={handleRadioChange}
          />
          Music
        </label>
        <label>
          <input
            type="radio"
            value="People & Blogs"
            checked={selectedDataset === 'People & Blogs'}
            onChange={handleRadioChange}
          />
          People and Blogs
        </label>
        <label>
          <input
            type="radio"
            value="Gaming"
            checked={selectedDataset === 'Gaming'}
            onChange={handleRadioChange}
          />
          Gaming
        </label>
        <label>
          <input
            type="radio"
            value="Comedy"
            checked={selectedDataset === 'Comedy'}
            onChange={handleRadioChange}
          />
          Comedy
        </label>
        <label>
          <input
            type="radio"
            value="Film & Animation"
            checked={selectedDataset === 'Film & Animation'}
            onChange={handleRadioChange}
          />
          Film and Animation
        </label>
        <label>
          <input
            type="radio"
            value="Education"
            checked={selectedDataset === 'Education'}
            onChange={handleRadioChange}
          />
          Education
        </label>
        <label>
          <input
            type="radio"
            value="Howto & Style"
            checked={selectedDataset === 'Howto & Style'}
            onChange={handleRadioChange}
          />
          How to and Style
        </label>
      </div> */}
      <PieChart />
      {/* <Map /> */}
      {/* <div>
        <select onChange={handleCategoryChange} value={selectedCategory}>
          <option value="">Select Category</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Music">Music</option>
          <option value="People & Blogs">People and Blogs</option>
          <option value="Gaming">Gaming</option>
          <option value="Comedy">Comedy</option>
          <option value="Film & Animation">Film and Animation</option>
          <option value="Education">Education</option>
          <option value="Howto & Style">Howto and Style</option>
          <option value="News & Politics">News and Politics</option>
          <option value="Science & Technology">Science and Technology</option>
          <option value="Shows">Shows</option>
          <option value="Sports">Sports</option>
          <option value="Pets & Animals">Pets and Animals</option>
        </select>
      </div> */}
    </div>
  )
}

export default App

