const data = [
  {
    name: 'lsc',
    age: 18
  },
  {
    name: 'fal',
    age: 19
  },
  {
    name: 'llz',
    age: 20
  }
];
console.log(data.filter(item => { return item.age > 19 }));