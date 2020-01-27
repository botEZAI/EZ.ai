const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('api/register', (req, res) => {
res.send({ message: 'Hello Express!' });
});

app.post('/api/register', function (req, res) {
    console.log('가나다라마');
    res.send('POST request to the homepage');
  });

app.listen(port, () => console.log(`Listening on port ${port}`));


