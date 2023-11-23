import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const Map = ({data}) => {
  const svgRef = useRef();
//   const [selectedCountry, setSelectedCountry] = useState('');

  useEffect(() => {

    d3.select(svgRef.current).selectAll('*').remove();

    const width = 800;
    const height = 500;

    const svg = d3.select(svgRef.current).attr('width', width).attr('height', height);

    const projection = d3.geoMercator().scale(120).translate([width / 2, height / 1.5]);
    const path = d3.geoPath().projection(projection);

    // Load world map data
    d3.json("https://cdn.jsdelivr.net/npm/world-atlas@2.0.2/countries-50m.json").then((worldData) => {
      // Draw the countries
      svg
        .selectAll('path')
        .data(topojson.feature(worldData, worldData.objects.countries).features)
        .enter()
        .append('path')
        .attr('class', 'country')
        .attr('d', path)
        .attr('fill', (d) => getColor(d, data)); 

    });
    
  }, [data]);

  const getColor = (country, inputData) => {
    return inputData.includes(country.properties.name) ? 'orange' : 'green';

  };

//   const handleCountryChange = (event) => {
//     setSelectedCountry(event.target.value);
//   };

  return (
    // <div>
    //   <select onChange={handleCountryChange} value={selectedCountry}>
    //     <option value="">Select a country</option>
    //     <option value="Brazil">Brazil</option>
    //     <option value="China">China</option>
    //     <option value="India">India</option>
    //     <option value="United States of America">US</option>
    //     {/* Add more countries as needed */}
    //   </select>
      <svg ref={svgRef}></svg>
    // </div>
  );
};

export default Map;