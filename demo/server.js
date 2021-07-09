/* eslint-disable */
const express = require('express');
const url = require('url');

const app = express();
app.use(express.json());
app.use(express.urlencoded());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const port = 8001;

function getModel() {
  return [
    {name: '1000 4x4 Mud Pro LTD', value: '17500067'},
    {
      name: '1000 4x4 XT',
      value: '17500068',
    },
    {name: '150', value: '13500005'},
    {name: '300 DVX', value: '13500006'},
    {
      name: '300 Utility',
      value: '15400005',
    },
    {name: '400 4x4', value: '66'},
    {name: '450 4x4', value: '15400007'},
    {
      name: '500 4x4',
      value: '77',
    },
    {name: '500 4x4 XT', value: '18400003'},
    {name: '550 4x4', value: '13500008'},
    {
      name: '550 4x4 LTD',
      value: '17500061',
    },
    {name: '550 4x4 XT', value: '18500005'},
    {name: '700 4x4', value: '13500015'},
    {
      name: '700 4x4 LTD',
      value: '17500064',
    },
    {name: '700 4x4 Mud Pro LTD', value: '17500066'},
    {
      name: '700 4x4 XT',
      value: '18500008',
    },
    {name: '700 Diesel Super Duty', value: '15400016'},
    {
      name: '90 DVX',
      value: '6500001',
    },
    {name: '90 Utility', value: '6500002'},
    {name: 'TBX 700', value: '15400017'},
    {
      name: 'TRV 1000 LTD',
      value: '18500105',
    },
    {name: 'TRV 400', value: '13500007'},
    {name: 'TRV 500', value: '18500004'},
    {
      name: 'TRV 550 LTD',
      value: '18500006',
    },
    {name: 'TRV 550 XT', value: '18500007'},
    {name: 'TRV 700 LTD', value: '18500010'},
    {
      name: 'TRV 700 XT',
      value: '18500009',
    },
    {name: 'XC 450 I', value: '17500060'},
  ];
}

function getType(make) {
  const rand = Math.floor(Math.random() * 10);
  // The first two make options are set in stone
  if (make === '3') {
    return [
      {name: 'ATV', value: 'pg7'},
      {name: 'Snowmobile', value: 'pg2'},
      {name: 'UTV', value: 'pg8'},
    ];
  } else if (make === '1000003') {
    return [
      {name: 'Snowmobile', value: 'pg2'}
    ];
  } else if (rand % 2 === 0) {
    return [
      {name: 'Snowmobile', value: 'pg2'}
    ];
  } else if (rand % 3 === 0) {
    return [
      {name: 'ATV', value: 'pg7'},
      {name: 'Snowmobile', value: 'pg2'},
      {name: 'UTV', value: 'pg8'},
    ];
  }
  return [];
}

function getMakes() {
  return [
    {name: 'Arctic Cat', value: '3'},
    {name: 'Beta', value: '1000003'},
    {
      name: 'BMW',
      value: '7',
    },
    {name: 'Can-Am', value: '13'},
    {name: 'Ducati', value: '18'},
    {
      name: 'Gas Gas',
      value: '21',
    },
    {name: 'Harley-Davidson', value: '22'},
    {name: 'Honda', value: '24'},
    {
      name: 'Husqvarna',
      value: '26',
    },
    {name: 'Indian', value: '27'},
    {name: 'John Deere', value: '30'},
    {
      name: 'Kawasaki',
      value: '32',
    },
    {name: 'KTM', value: '33'},
    {name: 'Moto Guzzi', value: '39'},
    {
      name: 'Polaris',
      value: '42',
    },
    {name: 'Royal Enfield', value: '1000004'},
    {name: 'Ski-Doo', value: '49'},
    {
      name: 'Suzuki',
      value: '54',
    },
    {name: 'Textron Offroad', value: '1000002'},
    {name: 'Triumph', value: '56'},
    {
      name: 'Yamaha',
      value: '63',
    },
  ];
}

function getYears() {
  return [
    {name: '2020', value: '2020'},
    {name: '2019', value: '2019'},
    {
      name: '2018',
      value: '2018',
    },
    {name: '2017', value: '2017'},
    {name: '2016', value: '2016'},
  ];
}

app.get('/shutdown', (req, res) => {
  shutDown();
});


app.get('/', (req, res) => {
  const urlParts = url.parse(req.url, true);
  const {query} = urlParts;
  console.log(query);
  let data;
  switch (query.type) {
    case 'year':
      data = getYears();
      break;
    case 'make':
      data = getMakes();
      break;
    case 'rideType':
      data = getType(query.make);
      break;
    case 'model':
      data = getModel();
      break;
    default:
      data = getYears();
      break;
  }
  res.write(JSON.stringify(data)); // write a response to the client
  res.end(); // end the response
});

app.post('/', (req, res) => {
  console.log(req.body);
  setTimeout(function(){
    res.write(JSON.stringify(req.body));
    res.end(); }, 3000);
});

const server = app.listen(port, () => console.log(`Demo server listening on port ${port}.`));

let connections = [];

process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

function shutDown() {
  console.log('Received kill signal, shutting down gracefully');
  server.close(() => {
    console.log('Closed out remaining connections');
    process.exit(0);
  });

  setTimeout(() => {
    console.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);

  connections.forEach(curr => curr.end());
  setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}

server.on('connection', connection => {
  connections.push(connection);
  connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});
