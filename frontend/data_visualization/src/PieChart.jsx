import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';


const PieChart = ({ data }) => {

    const svgRef = useRef();

    useEffect(() => {
        
        // clear previous chart
        d3.select(svgRef.current).selectAll('*').remove();

        const w = 500;
        const h = 500;
        const radius = w/2;
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('overflow', 'visible')
            .style('margin-top', '400px');

        const formatterData = d3.pie().value(d => d.value)(data);
        const arcGenerator = d3.arc().innerRadius(0).outerRadius(radius);
        const color = d3.scaleOrdinal().range(d3.schemeSet2);

        svg.selectAll()
           .data(formatterData)
           .join('path')
           .attr('d', arcGenerator)
           .attr('fill', d => color(d.value))
           .style('opacity', 0.7);

        svg.selectAll()
           .data(formatterData)
           .join('text')
           .text(d => d.data.property)
           .attr('transform', d => `translate(${arcGenerator.centroid(d)})`)
           .style('text-anchor', 'middle');

    }, [data]);

    return (
        <svg ref={svgRef}></svg>
    )
};


export default PieChart;