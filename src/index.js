import * as d3 from 'd3';

const data = [1, 2, 3, 4];

// const min = d3.min(data);
// const max = d3.max(data);
const minMax = d3.extent(data);
console.log(minMax);

// GET FORM OBJ

const dataObj = [
  { key: 'Jimeno0', value: 28 },
  { key: 'Vilva', value: 26 },
  { key: 'Paco', value: 25 },
  { key: 'Grana', value: 29 },
  { key: 'Alfon', value: 32 },
];

const maxObj = d3.max(dataObj, elem => elem.value);
const extentObj = d3.extent(dataObj, elem => elem.value);
console.log('max from obj', maxObj);
console.log('extent from object', extentObj);
