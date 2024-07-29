import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const VehicleContext = createContext();

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState([]);
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const fetchVehicles = async (page = 1, limit = 10, filter = {}) => {
    setIsLoading(true);

    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/vehicles`, {
        params: { page, limit, ...filter },
      });
      setVehicles(response.data.data);
      setTotalVehicles(response.data.total);
    } catch (error) {
      console.error('Failed to fetch vehicles:', error);
    }

    setIsLoading(false);
  };

  const addVehicle = async (vehicleData) => {
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/vehicles`, vehicleData);
      setVehicles((prev) => [...prev, response.data]);
      fetchVehicles();
    } catch (error) {
      console.log('Failed to add vehicle:', error);
    }
  };

  const updateVehicle = async (id, vehicleData) => {
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/${id}`, vehicleData);
      setVehicles((prev) =>
        prev.map((vehicle) => (vehicle.id === id ? response.data : vehicle))
      );
      fetchVehicles();
    } catch (error) {
      console.log('Failed to update vehicle:', error);
    }
  };

  const removeVehicle = async (id) => {
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/${id}`);
      setVehicles((prev) => prev.filter((vehicle) => vehicle.id !== id));
    } catch (error) {
      console.log('Failed to delete vehicle:', error);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  return (
    <VehicleContext.Provider value={{ vehicles, totalVehicles, isLoading, fetchVehicles, addVehicle, updateVehicle, removeVehicle }}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicleContext = () => useContext(VehicleContext);
