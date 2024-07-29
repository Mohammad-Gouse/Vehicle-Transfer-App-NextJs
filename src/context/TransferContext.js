import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const TransferContext = createContext();

export const TransferProvider = ({ children }) => {
  const [transfers, setTransfers] = useState([]);
  const [totalTransfers, setTotalTransfers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTransfers = async (page = 1, limit = 10, filter = {}) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/transfers`, {
        params: { page, limit, ...filter },
      });
      setTransfers(response.data.data);
      setTotalTransfers(response.data.total);
    } catch (error) {
      console.error('Failed to fetch transfers:', error);
    }

    setIsLoading(false);
  };

  const addTransfer = async (transferData) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/transfers`, transferData);
      setTransfers((prev) => [...prev, response.data]);
      fetchTransfers();
    } catch (error) {
      console.log('Failed to add transfer:', error);
    }
  };

  const updateTransfer = async (id, transferData) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/transfers/${id}`, transferData);
      setTransfers((prev) =>
        prev.map((transfer) => (transfer.id === id ? response.data : transfer))
      );
      fetchTransfers();
    } catch (error) {
      console.log('Failed to update transfer:', error);
    }
  };

  const removeTransfer = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/transfers/${id}`);
      setTransfers((prev) => prev.filter((transfer) => transfer.id !== id));
    } catch (error) {
      console.log('Failed to delete transfer:', error);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  return (
    <TransferContext.Provider value={{ transfers, totalTransfers, isLoading, fetchTransfers, addTransfer, updateTransfer, removeTransfer }}>
      {children}
    </TransferContext.Provider>
  );
};

export const useTransferContext = () => useContext(TransferContext);
