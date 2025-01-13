import express from 'express';
import { PORT } from './config.js';
import mongoose from 'mongoose';
import invoiceRoute from './routes/invoiceRoute.js';

import cors from 'cors';

const app = express();


app.use(express.json());


app.use(cors());

app.get('/', (request, response) => {
  console.log(request);
  return response.status(234).send('Welcome To MERN Stack Tutorial');
});

app.use('/invoice', invoiceRoute);

mongoose
  .connect('mongodb+srv://jenitjosephjose:RSxY5vKUrnO1xeXM@cluster.xg5hu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster'
)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
