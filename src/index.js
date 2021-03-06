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
  right: 40,
  bottom: 80,
  left: 70,
};
const height = h - margin.top - margin.bottom;
const width = w - margin.left - margin.right;
// Scalling data to fullfit svg
const x = d3.scaleBand()
  .domain(data.map(d => d.key))
  .padding(0.2)
  .range([0, width]);
const y = d3.scaleLinear()
  .domain([0, maxObj])
  .range([height, 0]);

const discretColorScale = d3.scaleOrdinal(d3.schemeCategory10);

// Set the axis
const xAxis = d3.axisBottom(x);

const yAxis = d3.axisLeft(y);

// Add gridLines
const yGridLines = d3.axisLeft(y).tickSize(-width).tickFormat('');

//
const svg = d3.select('body').append('svg')
  .attr('id', 'chart')
  .attr('height', h)
  .attr('width', w);

const chart = svg.append('g')
  .classed('chart-group', true)
  .attr('transform', `translate(${margin.left},${margin.top})`);

chart.append('g')
  .classed('gridline', true)
  .attr('transform', 'translate(0,0)')
  .call(yGridLines);

// svg.selectAll('.bar')
chart.selectAll('.bar')
  .data(data)
  .enter()
  .append('rect')
  .classed('bar', true)// same as .attr('class', 'bar') but can add several diferent classes
  .attr('x', d => x(d.key))
  .attr('y', d => y(d.value))
  .attr('height', d => height - y(d.value)) // take the fisrt height and remove 1px
  .attr('width', d => x.bandwidth())
.style('fill', (data, i) => discretColorScale(i));

// Get started with labels/text

// svg.selectAll('.bar-label')
chart.selectAll('.bar-label')
.data(data)
.enter()
.append('text')
.classed('bar-label', true)
  .text((d, i) => d.value)
  .attr('x', d => x(d.key) + (x.bandwidth() / 2))
  .attr('dx', () => -2)
  .attr('y', d => y(d.value))
  .attr('dy', -6);

// Append the axis
chart.append('g')
  .classed('x axis', true)
  .attr('transform', `translate(0,${height})`)
  .call(xAxis)
// Rotate x axis labels
  .selectAll('text')
  .style('text-anchor', 'end')
  .attr('dx', -8)
  .attr('dy', 8)
  .attr('transform', 'translate(0,0) rotate(-45)');


chart.append('g')
.classed('y axis', true)
.attr('transform', 'translate(0,0)')
.call(yAxis);

// Add axis description(ages & name words)
chart.select('.y.axis')
  .append('text')
  .classed('axis-description', true)
  .attr('text-anchor', 'middle')
  .attr('x', 0)
  .attr('y', 0)
  .attr('transform', `translate(-40,${height / 2}) rotate(-90)`)
  .text('Ages');

chart.select('.x.axis')
  .append('text')
  .classed('axis-description', true)
  .attr('transform', `translate(${width / 2},60)`)
  .text('name');
