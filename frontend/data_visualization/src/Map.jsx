import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import axios from 'axios';

const Map = () => {

  const svgRef = useRef();

  const [ selectedCategory, setSelectedCategory ] = useState();
  const [mapData, setMapData ] = useState([]);
  const [countries, setCountries] = useState([]);
  const [tooltip, setTooltip] = useState({ display: false, data: { name: '', value: '' } });

  const country = [];
  
  useEffect( () => {

    fetch(`http://localhost:3000/api/csv-data/map/${selectedCategory}`)
    .then((response) => response.json())
    .then((data) => {
      for(var [k,v] of data){
        country.push([k,v]);
      }
      setCountries(country);
      console.log(country.map((x) => x[0]))
    });

  }, [selectedCategory]);


  useEffect( () => {
    
    
    d3.select(svgRef.current).selectAll('*').remove();
   
  
    const width = 1200;
    const height = 550;

    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

    const projection = d3.geoMercator().scale(120).translate([width / 2, height / 1.5]);
    const path = d3.geoPath().projection(projection);


    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json").then((worldData) => {
      // Draw the countries
        
      svg
        .selectAll('path')
        .data(topojson.feature(worldData, worldData.objects.countries).features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', path)
        .attr('fill', (d) => getColor(d, countries))
        .on('mouseover', (event, d) => handleMouseOver(event, d))
        .on('mouseout', () => handleMouseOut());

    });

      // console.log('countries ' + countries)

      // Attach mouseover and mouseout events
      // svg.selectAll('.country')
      //   .on('mouseover', (event, d) => handleMouseOver(event, d))
      //   .on('mouseout', () => handleMouseOut());

  }, [countries]);

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`http://localhost:3000/api/csv-data/map/${selectedCategory}`);
  //     setMapData(response.data || []);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const getColor = (country, inputData) => {
    if(inputData.map((x) => x[0]).includes(country.properties.name)){
      return colorScale(country.properties.name);
    }
    else{
      return 'lightblue';
    }

  };

  const handleMouseOver = (event, data) => {
    const countryName = data.properties.name;
    // Check if the country is in the countries list
    if (countries.map((x) => x[0]).includes(countryName)) {
      const [x, y] = d3.pointer(event);
      const v = countries.map((x) => { if (x[0] === countryName) return x[1] })
      const val = v.filter((x) => x !== undefined);
      setTooltip({ display: true, data: { name: countryName, value: val }, x, y });
    }
    console.log(countryName)
  };

  const handleMouseOut = () => {
    setTooltip({ display: false, data: { name: '', value: '' } });
  };

  // const getCountries = () => {
  //   for(let i=0; i<mapData.length; i++) {
  //     country.push(mapData[i][0])
  //     console.log(mapData[i][0] + " : " + mapData[i][1])
  //   }
  // }

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
      <div>

        <svg ref={svgRef}></svg>

        {tooltip.display && (
          <div
            style={{
              position: 'absolute',
              left: tooltip.x + 50,
              top: tooltip.y - 10,
              background: 'black',
              padding: '3px',
              border: '1px solid #ccc',
            }}
          >
            <p>{`${tooltip.data.name}`}</p>
            <p>{`Blogs: ${tooltip.data.value}`}</p>
          </div>
        )}

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
      </div>
  );

};

export default Map;