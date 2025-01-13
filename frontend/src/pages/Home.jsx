import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';

import { MdOutlineAddBox } from 'react-icons/md';
import InvoiceTable from '../components/home/InvoiceTable';
import Navbar from '../components/Navbar/Navbar';


const Home = () => {
  const [invoice, setInvoice] = useState([]);
  const [loading, setLoading] = useState(false);
  

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://delhi-digital-co-assignment-backend.onrender.com/invoice')
      .then((response) => {
        setInvoice(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <>
    <Navbar/>
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Invoice List</h1>
        <Link to='/invoice/create'>
          <MdOutlineAddBox className='text-sky-800 text-4xl' />
        </Link>
      </div>
      {loading ? (
        <Spinner />
      ) :  (
        <InvoiceTable invoice={invoice} />
      )}
    </div>
    </>
  );
};

export default Home;
