import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowInvoice = () => {
  const [invoice, setInvoice] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`https://delhi-digital-co-assignment-backend.onrender.com/invoice/${id}`)
      .then((response) => {
        setInvoice(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Invoice</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4'>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Id</span>
            <span>{invoice._id}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Invoice
            Number</span>
            <span>{invoice.invoiceNumber}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Client Name</span>
            <span>{invoice.clientName}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Date</span>
            <span>{invoice.date}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Amount</span>
            <span>{invoice.amount}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Status</span>
            <span>{invoice.status}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Create Time</span>
            <span>{new Date(invoice.createdAt).toString()}</span>
          </div>
          <div className='my-4'>
            <span className='text-xl mr-4 text-gray-500'>Last Update Time</span>
            <span>{new Date(invoice.updatedAt).toString()}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowInvoice
