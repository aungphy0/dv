import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Data from './Data'
import axios from 'axios';
import PieChart from './PieChart'



function App() {
  /*
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
  */

  const [ selectedDataset, setSelectedDataset ] = useState();
  const [ chartData, setChartData ] = useState([]);

  /*
  useEffect(() => {
    fetch('http://localhost:3000/api/csv-data/countries')
      .then((response) => response.json())
      .then((data) => setChartData(data))
      .catch((error) => console.error("Error fetching data: ", error));

      console.log(chartData)
  }, []);
  */

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

  
  return (
    <div className="App">
      {/* <Data /> */}
      <div>
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
      </div>
      <PieChart data={dataArray} />
    </div>
  )
}

export default App
