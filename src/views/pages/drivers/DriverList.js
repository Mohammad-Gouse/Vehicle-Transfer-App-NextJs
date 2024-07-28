import React, { useEffect, useState, useRef, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Button } from '@mui/material';
import { useDriverContext } from '@/context/DriverContext';
import DriverDialog from './components/DriverDialog';

const DriverList = () => {
  const { drivers, totalDrivers, fetchDrivers, isLoading, removeDriver, addDriver, updateDriver } = useDriverContext();

  // const [page, setPage] = useState(1);
  // const [pageSize, setPageSize] = useState(10);

  // const [pageSize, setPageSize] = useState(5);
  // const [currentPage, setCurrentPage] = useState(1);/

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
});



  
  const [filterName, setFilterName] = useState('');
  const [filterPhoneNumber, setFilterPhoneNumber] = useState('');
  const [selectedDriver, setSelectedDriver] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  // useEffect(() => {
  //   fetchDrivers(currentPage, pageSize, { name: filterName, phoneNumber: filterPhoneNumber });
  // }, [filterName, filterPhoneNumber]);

  useEffect(() => {
    console.log(paginationModel)
    fetchDrivers(paginationModel.page+1, paginationModel.pageSize, { name: filterName, phoneNumber: filterPhoneNumber });
}, [paginationModel, filterName, filterPhoneNumber]);

const rowCountRef = useRef(totalDrivers || 1);

const rowCount = useMemo(() => {
    if (totalDrivers !== undefined) {
        rowCountRef.current = totalDrivers;
    }
    return rowCountRef.current;
}, [totalDrivers]);


  const handleDelete = async (id) => {
    await removeDriver(id);
  };

  const handleEdit = (driver) => {
    setSelectedDriver(driver);
    setOpenDialog(true)
    
  };



  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedDriver(null);
  };



  const cols = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'phoneNumber', headerName: 'Phone Number', width: 150 },
    {
      field: 'profilePhoto',
      headerName: 'Profile Photo',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value?`data:image/png;base64,${Buffer.from(params.value).toString('base64')}`:''}
          alt="Profile"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          <Button onClick={() => handleEdit(params.row)}>Edit</Button>
          <Button onClick={() => handleDelete(params.row.id)} color="secondary">
            Delete
          </Button>
        </Box>
      ),
    },
  ]

  

  return (
    <Box style={{ width: '100%'}}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
        <TextField
          label="Filter by Name"
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          margin="normal"
          size='small'
          style={{marginRight: '20px'}}
        />
        <TextField
          label="Filter by Phone Number"
          value={filterPhoneNumber}
          size='small'
          onChange={(e) => setFilterPhoneNumber(e.target.value)}
          margin="normal"
        />
        </Box>

        <Button variant="contained" style={{height:'50px', marginTop: '20px'}} size='small' color="primary" onClick={() => setOpenDialog(true)}>
          Add Driver
        </Button>

        <DriverDialog
        open={openDialog}
        onClose={handleDialogClose}
        driver={selectedDriver}
        addDriver = {addDriver}
        updateDriver = {updateDriver}

      />

         <DriverDialog
        open={openDialog}
        onClose={handleDialogClose}
        driver={selectedDriver}
        addDriver = {addDriver}
        updateDriver = {updateDriver}

      />
      </Box>

            <DataGrid
                rows={drivers}
                columns={cols}
                rowCount={rowCount}
                loading={isLoading}
                pageSizeOptions={[5, 10, 20]}
                paginationModel={paginationModel}
                paginationMode="server"
                onPaginationModelChange={setPaginationModel}
                disableSelectionOnClick
                style={{ height: '450px', overflow: 'scroll' }}
            />

      
    </Box>
  );
};

export default DriverList;
