// Dependencies
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const file = './db.json';

// Initialize Database
if (!fs.existsSync(file)) {
    fs.writeFile(file, JSON.stringify({ users: [], todos: [] }), 'utf8', () => console.log(`Created ${file}.`));
}

// Defaults
const port = 5000;
const version = '1.0.1';

// Settings
app.set('VERSION', process.env.VERSION || version);
app.set('HOST', process.env.HOST || '0.0.0.0');
app.set('PORT', process.env.PORT || port);
app.set('ENV', process.env.NODE_ENV || 'development');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Endpoints
app.get('/', (req, res) => res.send({ version: app.get('VERSION') }));
app.use('/api', require('./routes'));

// Port Listen
app.listen(app.get('PORT'), () => {
    if (process.env.NODE_ENV !== 'production') {
        console.log(
        'API is running at %s:%d in %s mode.',
        app.get('HOST'),
        app.get('PORT'),
        app.get('ENV')
        );
    }
});