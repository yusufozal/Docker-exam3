const express = require('express');
const redis = require('redis');
const process=require('process');

const app = express();
// 'redis-server' olmalı, 'redis:server' değil
const client = redis.createClient({host: 'redis-server', port: 6379});
client.set('visits', 0);

app.get('/', (req, res) => {
    process.exit("0");
    client.get('visits', (err, visits) => {
        if (err) {
            console.error('Redis error:', err);
            return res.status(500).send('Error occurred');
        }
        res.send('Number of visits: ' + visits);
        client.set('visits', parseInt(visits) + 1);
    });
});

app.listen(8081, () => {
    console.log('Listening on Port 8081');
});