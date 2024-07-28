import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const DriverContext = createContext();

export const DriverProvider = ({ children }) => {
  const [drivers, setDrivers] = useState([]);
  const [totalDrivers, setTotalDrivers] = useState(0);
  const [isLoading, setIsLoading] = useState(false);


  const fetchDrivers = async (page = 1, limit = 10, filter = {}) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/drivers`, {
        params: { page, limit, ...filter },
      });
      setDrivers(response.data.data);
      setTotalDrivers(response.data.total);
    } catch (error) {
      console.error('Failed to fetch drivers:', error);
    }

    setIsLoading(false);
  };

  const addDriver = async (driverData) => {

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/drivers`, driverData);
      setDrivers((prev) => [...prev, response.data]);
      fetchDrivers()
    } catch (error) {
      console.log('failed to add driver')
    }

  };

  const updateDriver = async (id,profilePhoto, driverData) => {

    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/drivers/${id}`, driverData);
      setDrivers((prev) =>
        prev.map((driver) => (driver.id === id ? response.data : driver))
      );
      fetchDrivers()
    } catch (error) {
      console.log('failed to update driver')
    }

  };

  const removeDriver = async (id) => {

    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/drivers/${id}`);
      setDrivers((prev) => prev.filter((driver) => driver.id !== id));
    } catch (error) {
      console.log('failed to delete driver');
    }

  };

  useEffect(() => {
    fetchDrivers();
  }, []);

  return (
    <DriverContext.Provider value={{ drivers, totalDrivers, isLoading, fetchDrivers, addDriver, updateDriver, removeDriver }}>
      {children}
    </DriverContext.Provider>
  );
};

export const useDriverContext = () => useContext(DriverContext);
