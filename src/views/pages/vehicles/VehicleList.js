import React, { useEffect, useState, useRef, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { TextField, Box, Button } from '@mui/material';
import { useVehicleContext } from '@/context/VehicleContext';
// import VehicleDialog from './VehicleDialog';
import VehicleDialog from './components/VehicleDialog';
const VehicleList = () => {
  const { vehicles, totalVehicles, fetchVehicles, isLoading, removeVehicle, addVehicle, updateVehicle } = useVehicleContext();

  const [paginationModel, setPaginationModel] = React.useState({
    page: 0,
    pageSize: 5,
  });

  const [filterVehicleNumber, setFilterVehicleNumber] = useState('');
  const [filterVehicleType, setFilterVehicleType] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    fetchVehicles(paginationModel.page + 1, paginationModel.pageSize, { vehicleNumber: filterVehicleNumber, vehicleType: filterVehicleType });
  }, [paginationModel, filterVehicleNumber, filterVehicleType]);

  const rowCountRef = useRef(totalVehicles || 1);

  const rowCount = useMemo(() => {
    if (totalVehicles !== undefined) {
      rowCountRef.current = totalVehicles;
    }
    return rowCountRef.current;
  }, [totalVehicles]);

  const handleDelete = async (id) => {
    await removeVehicle(id);
  };

  const handleEdit = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedVehicle(null);
  };

  const cols = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'vehicleNumber', headerName: 'Vehicle Number', width: 150 },
    { field: 'vehicleType', headerName: 'Vehicle Type', width: 150 },
    {
      field: 'pucCertificate',
      headerName: 'PUC Certificate',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value ? `data:image/png;base64,${Buffer.from(params.value).toString('base64')}` : ''}
          alt="PUC"
          style={{ width: 50, height: 50 }}
        />
      ),
    },
    {
      field: 'insuranceCertificate',
      headerName: 'Insurance Certificate',
      width: 150,
      renderCell: (params) => (
        <img
          src={params.value ? `data:image/png;base64,${Buffer.from(params.value).toString('base64')}` : ''}
          alt="Insurance"
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
  ];

  return (
    <Box style={{ width: '100%' }}>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Box>
          <TextField
            label="Filter by Vehicle Number"
            value={filterVehicleNumber}
            onChange={(e) => setFilterVehicleNumber(e.target.value)}
            margin="normal"
            size="small"
            style={{ marginRight: '20px' }}
          />
          <TextField
            label="Filter by Vehicle Type"
            value={filterVehicleType}
            size="small"
            onChange={(e) => setFilterVehicleType(e.target.value)}
            margin="normal"
          />
        </Box>

        <Button variant="contained" style={{ height: '50px', marginTop: '20px' }} size="small" color="primary" onClick={() => setOpenDialog(true)}>
          Add Vehicle
        </Button>

        <VehicleDialog
          open={openDialog}
          onClose={handleDialogClose}
          vehicle={selectedVehicle}
          addVehicle={addVehicle}
          updateVehicle={updateVehicle}
        />
      </Box>

      <DataGrid
        rows={vehicles}
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

export default VehicleList;
