import Header from '@/components/Header'
import { DriverProvider } from '@/context/DriverContext'
import DriverList from '@/views/pages/drivers/DriverList'
import React from 'react'
import { Box, Container } from '@mui/material';
import Sidebar from '@/components/Sidebar';


const index = () => {
  return (
    <Box style={{width:'97vw', height: '200vh'}}>
    <Sidebar />
    <Box style={{width:'92%',height: '100%', paddingLeft: '100px'}}>
      <Header />
      <DriverProvider>
          <DriverList />
      </DriverProvider>
    </Box>
  </Box>
  )
}

export default index