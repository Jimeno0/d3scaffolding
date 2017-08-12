import * as d3 from 'd3';
import './main.css';

const data = [
  { key: 'Jimeno0', value: 28 },
  { key: 'Vilva', value: 26 },
  { key: 'Paco', value: 25 },
  { key: 'Grana', value: 29 },
  { key: 'Alfon', value: 32 },
];

const maxObj = d3.max(data, elem => elem.value);
const extentObj = d3.extent(data, elem => elem.value);


// Create programatically our chart
const h = 600;
const w = 800;

// Scalling data to fullfit svg
const x = d3.scaleLinear()
  .domain([0, maxObj])
  .range([0, w]);
const y = d3.scaleLinear()
  .domain([0, data.length])
  .range([0, h]);

const svg = d3.select('body').append('svg')
            .attr('id', 'chart')
            .attr('height', h)
            .attr('width', w);

svg.selectAll('.bar')
  .data(data)
  .enter()
  .append('rect')
  .classed('bar', true)// same as .attr('class', 'bar') but can add several diferent classes
  .attr('x', 0)
  .attr('y', (data, i) => y(i))
  .attr('height', (data, i) => y(1) - 1) // take the fisrt height and remove 1px
  .attr('width', (data, i) => x(data.value));
