import * as d3 from 'd3';
import './main.css';

const data = [
  { key: 'Jimeno0', value: 28 },
  { key: 'Vilva', value: 26 },
  { key: 'Paco', value: 25 },
  { key: 'Grana', value: 29 },
  { key: 'Alfon', value: 32 },
];

// const maxObj = d3.max(data, elem => elem.value);
// const extentObj = d3.extent(data, elem => elem.value);


// Create programatically our chart
const h = 600;
const w = 800;

const svg = d3.select('body').append('svg')
            .attr('id', 'chart')
            .attr('height', h)
            .attr('width', w);

svg.selectAll('.bar')
  .data(data)
  .enter()
  .append('rect')
  .attr('class', 'bar')
  .attr('x', 0)
  .attr('y', (data, i) => i * 20)
  .attr('height', 19)
  .attr('width', (data, i) => data.value);
