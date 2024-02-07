import React, { useEffect } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import regionsData from './regions.json';

const Map = () => {
  useEffect(() => {
    const svgWidth = 600; 
    const svgHeight = 400; 

    const svg = d3
      .select('.map-container') 
      .append('svg') 
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    const regions = topojson.feature(regionsData, regionsData.objects.regions);

    const projection = d3.geoMercator().fitSize([svgWidth, svgHeight], regions);
    const pathGenerator = d3.geoPath().projection(projection);

    svg
      .selectAll('.region')
      .data(regions.features)
      .enter()
      .append('path')
      .attr('class', 'region')
      .attr('d', pathGenerator)
      .style('fill', 'white') 
      .style('stroke', 'black')
      .on('mouseover', handleMouseOver)
      .on('mouseout', handleMouseOut);

    svg
      .selectAll('.label')
      .data(regions.features)
      .enter()
      .append('text')
      .style('stroke', 'black') 
      .attr('class', 'label')
      .attr('transform', (d) => `translate(${pathGenerator.centroid(d)})`)
      .attr('dy', '-1.5em')
      .attr('text-anchor', 'middle')
      .style('font-size', '10px')
      .style('fill', 'balck')
      .text((d) => d.properties['name:en']);
  
    function handleMouseOver(d) {
      d3.select(this).style('fill', 'orange');
    }
    function handleMouseOut() {
      d3.select(this).style('fill', "white");
    }

    return () => {
      svg.remove();
    };
  }, []);

  return (
    <div className="map-container" style={{ width: '800px', height: '430px', background: '#d4f1f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    </div>
  );
};

export default Map;
