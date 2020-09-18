import express from 'express';

const app = express();

app.get('/', (req, res) => {
  res.send('Server is up and running');
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`)
});