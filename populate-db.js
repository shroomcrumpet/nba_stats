const pg = require('pg');
const jsonfile = require('jsonfile');


const configs = {
  user: 'kencheng',
  host: '127.0.0.1',
  database: 'nba_db',
  port: 5432,
};

const client = new pg.Client(configs);


jsonfile.readFile('players.json', (err, obj) => {

  if (err) console.error(err);

    client.connect((err) => {

        if (err) {console.log('error', err);};

        for (i in obj.players) {

            let values = [];

            values.push(obj.players[i].name);
            values.push(obj.players[i].age);
            values.push(obj.players[i].team);
            values.push(obj.players[i].games);
            values.push(obj.players[i].points);


            let queryString = 'INSERT INTO players (name, age, team, games, points) VALUES ($1, $2, $3, $4, $5) RETURNING *';

            client.query(queryString, values, (err, res) => {

                if (err) {console.log('query error', err);}

                else {

                    console.log('result', res.rows);

                };
            });
        };
    });
});


