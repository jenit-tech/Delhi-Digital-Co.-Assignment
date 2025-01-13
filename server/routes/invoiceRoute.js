import express, { response } from 'express';
import { Invoice } from '../models/invoiceModel.js';
import {User } from '../models/userModel.js'

const router = express.Router();

router.post('/signup', async (request, response) => {
  try {
   
    if (
      !request.body.name ||
      !request.body.email ||
      !request.body.password 
    ) {
      return response.status(400).send({
        message: 'Send all required fields: invoiceNumber, clientName, date, amount, status',
      });
    }

    
    const newUser = {
      name: request.body.name,
      email: request.body.email,
      password: request.body.password
    };

    
    const user = await User.create(newUser);

    
    return response.status(201).send(user);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
  
})

router.post('/login', async (request, response) => {
  try {
    const { email, password } = request.body;

    
    const user = await User.findOne({ email: email });

    if (!user) {
      
      return response.status(404).send({ message: "User not found" });
    }

   
    if (user.password === password) {
     
      response.status(201).send({ 
        message: "Login successful",
        user,
      });
    } else {
      
      response.status(401).send({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Login error:", error.message);
    response.status(500).send({ message: "Internal server error" });
  }
});



router.post('/', async (request, response) => {
  try {
    
    if (
      !request.body.invoiceNumber ||
      !request.body.clientName ||
      !request.body.date ||
      !request.body.amount ||
      !request.body.status
    ) {
      return response.status(400).send({
        message: 'Send all required fields: invoiceNumber, clientName, date, amount, status',
      });
    }

    
    const newBook = {
      invoiceNumber: request.body.invoiceNumber,
      clientName: request.body.clientName,
      date: request.body.date,
      amount: request.body.amount,
      status: request.body.status,
    };

    
    const book = await Invoice.create(newBook);

   
    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});



router.get('/', async (request, response) => {
  try {
    const books = await Invoice.find({});

    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.get('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const book = await Invoice.findById(id);

    return response.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.put('/:id', async (request, response) => {
  try {
    if (
      !request.body.invoiceNumber ||
      !request.body.clientName ||
      !request.body.date ||
      !request.body.amount ||
      !request.body.status
    ) {
      return response.status(400).send({
        message: 'Send all required fields: invoiceNumber, clientName, date, amount, status',
      });
    }

    const { id } = request.params;

    const result = await Invoice.findByIdAndUpdate(id, request.body);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book updated successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});


router.delete('/:id', async (request, response) => {
  try {
    const { id } = request.params;

    const result = await Invoice.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: 'Book not found' });
    }

    return response.status(200).send({ message: 'Book deleted successfully' });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

export default router;
