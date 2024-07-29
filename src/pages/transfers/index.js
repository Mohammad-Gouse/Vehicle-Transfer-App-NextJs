import Header from '@/components/Header'
import React from 'react'
import { Box } from '@mui/material';
import Sidebar from '@/components/Sidebar';
import { TransferProvider } from '@/context/TransferContext';
import TransferList from '@/views/pages/transfers/TransferList';
import { DriverProvider } from '@/context/DriverContext';
import { VehicleProvider } from '@/context/VehicleContext';


const index = () => {
    return (
        <Box style={{ width: '97vw', height: '200vh' }}>
            <Sidebar />
            <Box style={{ width: '92%', height: '100%', paddingLeft: '100px' }}>
                <Header />
                <TransferProvider>
                    <DriverProvider>
                        <VehicleProvider>
                            <TransferList />
                        </VehicleProvider>
                    </DriverProvider>
                </TransferProvider>
            </Box>
        </Box>
    )
}

export default index