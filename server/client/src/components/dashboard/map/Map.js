import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';
import regionsData from './regions.json';

const regionData = {
  'Tanger-Tetouan-Al Hoceima': ['Al Hoceima', 'Chefchaouen', 'Anjra', 'Larache', 'Md iq', 'Ouazzane', 'Tangier', 'Tetouan'],
  'L Oriental': ['Berkane', 'Driouch', 'Figuig', 'Guercif', 'Jerada', 'Nador', 'Oujda', 'Taourirt'],
  'Draa-Tafilalet': ['Errachidia', 'Midelt', 'Ouarzazate', 'Tinghir', 'Zagora'],
  'Souss-Massa': ['Agadir', 'Biougra', 'Inezgane', 'Taroudant', 'Tata', 'Tiznit'],
  'Guelmim-Oued Noun': ['Assa', 'Guelmim', 'Sidi Ifni', 'Tan-Tan'],
  'Casablanca-Settat': ['Benslimane', 'Berrechid', 'Casablanca', 'El Jadida', 'Mediouna', 'Mohammedia', 'Nouaceur', 'Settat', 'Sidi Bennour'],
  'Marrakech-Safi': ['Tahannaout', 'Chichaoua', 'Kalaat Sraghna', 'Essaouira', 'Marrakesh', 'Ben Guerir', 'Safi', 'Youssoufia'],
  'Laayoune-Sakia El Hamra': ['Boujdour', 'Smara', 'Laayoune', 'Tarfaya'],
  'Dakhla-Oued Ed-Dahab': ['Aousserd', 'Dakhla'],
  'Rabat-Sale-Kenitra': ['Kenitra', 'Khemisset', 'Rabat', 'Sale', 'Sidi Kacem', 'Sidi Slimane', 'Temara'],
  'Fes-Meknes': ['Boulemane', 'El Hajeb', 'Fez', 'Ifrane', 'Meknes', 'Moulay Yacoub', 'Sefrou', 'Taounate', 'Taza'],
  'Beni Mellal-Khenifra': ['Azilal', 'Beni Mellal', 'Fquih Ben Salah', 'Khenifra', 'Khouribga'],
};

const Map = () => {
  const [allOrders, setAllOrders] = useState([]);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders/allOrders');
      const data = await response.json();
      setAllOrders(data);
    } catch (error) {
      console.log('An error occurred while fetching data. Please try again.');
    }
  };

  useEffect(() => {
    const svgWidth = 600;
    const svgHeight = 400;
    fetchData();

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
    .style('fill', (d) => {
      const regionName = findRegionNameByAddress(d.properties['name:en']);
      const ordersInRegion = allOrders.filter((order) => {
        const customerRegion = findRegionNameByAddress(order.customerAddress);
        return customerRegion === regionName;
      });
      return getColorBasedOnOrderCount(ordersInRegion.length);
    })
    .style('stroke', 'black');

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
      .style('fill', 'black')
      .text((d) => d.properties['name:en']);

      function getColorBasedOnOrderCount(orderCount) {
        const darkGreen = 'darkgreen';
        const mediumDarkGreen = '#006400'; 
        const mediumLightGreen = '#00AA00'; 
        const lightGreen = 'lightgreen';
      
        if (orderCount > 50) {
          return darkGreen;
        } else if (orderCount > 30) {
          return mediumDarkGreen;
        } else if (orderCount >15 ) {
          return mediumLightGreen;
        } else if (orderCount >5) {
          return lightGreen;
        } else {
          return 'white'; 
        }
      }

      function findRegionNameByAddress(address) {
        const normalizedAddress = address.toLowerCase().replace(/\s/g, ''); 
      
        for (const region in regionData) {
          const normalizedRegion = region.toLowerCase().replace(/\s/g, ''); 
          if (regionData[region].some(city => normalizedAddress.includes(city.toLowerCase().replace(/\s/g, '')))) {
            return region;
          }
        }
        return null; 
      }
      
      

    return () => {
      svg.remove();
    };
  }, [allOrders]);

  return (
    <div >
    <div className="map-container position-relative" style={{ width: '800px', height: '430px', background: '#d4f1f9', display: 'flex', justifyContent: 'center', alignItems: 'center' }}></div>
    <div className="position-absolute bottom-0 end-0 mb-5 ml-5" style={{marginRight:"140px" , padding:"20px"}}>
   <ul style={{ listStyle: "none", padding: 0 }}>
  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
    <span className="color-square" style={{ backgroundColor: 'darkgreen', width: '20px', height: '20px', marginRight: '8px' }}></span>
    More than 50 orders
  </li>
  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
    <span className="color-square" style={{ backgroundColor: '#006200', width: '20px', height: '20px', marginRight: '8px' }}></span>
    16 to 30 orders
  </li>
  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
    <span className="color-square" style={{ backgroundColor: '#00AA00', width: '20px', height: '20px', marginRight: '8px' }}></span>
    6 to 15 orders
  </li>
  <li style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
    <span className="color-square" style={{ backgroundColor: 'lightgreen', width: '20px', height: '20px', marginRight: '8px' }}></span>
    1 to 5 order
  </li>
  <li style={{ display: 'flex', alignItems: 'center' }}>
    <span className="color-square" style={{ backgroundColor: 'white', width: '20px', height: '20px', marginRight: '8px', border: '1px solid #000' }}></span>
    No orders
  </li>
</ul>



</div>

    </div>
  );
};

export default Map;
