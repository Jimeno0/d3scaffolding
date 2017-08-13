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

const margin = {
  top: 20,
  right: 20,
  bottom: 20,
  left: 20,
};
const height = h - margin.top - margin.bottom;
const width = w - margin.left - margin.right;
// Scalling data to fullfit svg
const x = d3.scaleLinear()
  .domain([0, maxObj])
  .range([0, width]);
const y = d3.scaleBand()
  .domain(data.map(d => d.key))
  .range([0, height]);

// Color scales:
// Lineal
// const linearColorScale = d3.scaleLinear()
//  .domain([0, data.length])
//  .range(['#DB7093', '#000000']);
// Discret
const discretColorScale = d3.scaleOrdinal(d3.schemeCategory10);

const svg = d3.select('body').append('svg')
            .attr('id', 'chart')
            .attr('height', h)
            .attr('width', w);

const chart = svg.append('g')
  .classed('chart-group', true)
  .attr('transform', `translate(${margin.top},${margin.right})`);

// svg.selectAll('.bar')
chart.selectAll('.bar')
  .data(data)
  .enter()
  .append('rect')
  .classed('bar', true)// same as .attr('class', 'bar') but can add several diferent classes
  .attr('x', 0)
  .attr('y', d => y(d.key))
  .attr('height', () => y.bandwidth() - 1) // take the fisrt height and remove 1px
  .attr('width', d => x(d.value))
.style('fill', (data, i) => discretColorScale(i));

// Get started with labels/text

// svg.selectAll('.bar-label')
chart.selectAll('.bar-label')
.data(data)
.enter()
.append('text')
.classed('bar-label', true)
  .text((d, i) => d.key)
  .attr('x', d => x(d.value))
  .attr('dx', () => -2)
  .attr('y', d => y(d.key))
  .attr('dy', (data, i) => y.bandwidth() * 0.5 + 6);
