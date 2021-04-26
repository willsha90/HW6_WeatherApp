fetch('http://api.openweathermap.org/data/2.5/weather?q=Boston&appid=dbf5f0cf87ab9e0799c0fb6cd0b54ea4')
  .then(response => response.json())
  .then(data => console.log(data));

//   http:api.openweathermap.org/data/2.5/forecast?q=Boston&appid=
//   dbf5f0cf87ab9e0799c0fb6cd0b54ea4'
  // http://api.openweathermap.org/data/2.5/forecast?q=Boston&appid=dbf5f0cf87ab9e0799c0fb6cd0b54ea4'

  fetch('http://api.openweathermap.org/data/2.5/forecast?q=Boston&appid=dbf5f0cf87ab9e0799c0fb6cd0b54ea4')
  .then(response => response.json())
  .then(data => console.log(data));

