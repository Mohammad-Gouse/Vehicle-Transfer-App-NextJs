import Header from '@/components/Header'
import React from 'react'
import { Box } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import { VehicleProvider } from '@/context/VehicleContext';
import VehicleList from '@/views/pages/vehicles/VehicleList';


const index = () => {
  return (
    <Box style={{width:'97vw', height: '200vh'}}>
    <Sidebar />
    <Box style={{width:'92%',height: '100%', paddingLeft: '100px'}}>
      <Header />
      <VehicleProvider>
          <VehicleList />
      </VehicleProvider>
    </Box>
  </Box>
  )
}

export default index