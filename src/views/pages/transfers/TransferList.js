import React, { useState, useEffect, useRef, useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button, TextField } from '@mui/material';
import { useTransferContext } from '@/context/TransferContext';
import TransferDialog from './components/TransferDialog';

const TransferList = () => {
  const { transfers, totalTransfers, fetchTransfers, isLoading, removeTransfer, addTransfer, updateTransfer } = useTransferContext();

  const [paginationModel, setPaginationModel] = useState({
    page: 0,
    pageSize: 5,
  });

  const [filterFromDriver, setFilterFromDriver] = useState('');
  const [filterToDriver, setFilterToDriver] = useState('');
  const [filterVehicle, setFilterVehicle] = useState('');
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {

    console.log('fetch data')
    fetchTransfers(paginationModel.page + 1, paginationModel.pageSize, {
      fromDriver: filterFromDriver,
      toDriver: filterToDriver,
      vehicle: filterVehicle,
    });
  }, [paginationModel]);

  const rowCountRef = useRef(totalTransfers || 1);

  const rowCount = useMemo(() => {
    if (totalTransfers !== undefined) {
      rowCountRef.current = totalTransfers;
    }
    return rowCountRef.current;
  }, [totalTransfers]);

  const handleDelete = async (id) => {
    console.log("delete", id)
    await removeTransfer(id);
  };

  const handleEdit = (transfer) => {
    setSelectedTransfer(transfer);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setSelectedTransfer(null);
  };


  const cols = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
        field: 'fromDriver',
        headerName: 'From Driver',
        width: 150,
        valueGetter: (params) => {
          return params.name;
        },
      },
      {
        field: 'toDriver',
        headerName: 'To Driver',
        width: 150,
        valueGetter: (params) => {
          return params.name;
        },
      },
      {
        field: 'vehicle',
        headerName: 'Vehicle',
        width: 150,
        valueGetter: (params) => {
          return params.vehicleNumber;
        },
      },
      {
        field: 'transferDate',
        headerName: 'Transfer Date',
        width: 180,
        valueFormatter: (params) => {
          return new Date(params).toLocaleDateString();
        },
      },
    {
      field: 'actions',
      headerName: 'Actions',
      width: 150,
      renderCell: (params) => (
        <Box>
          {/* <Button onClick={() => handleEdit(params.row)}>Edit</Button> */}
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

        </Box>
        <Button variant="contained" style={{ height: '50px', marginTop: '20px' }} size='small' color="primary" onClick={() => setOpenDialog(true)}>
          Add Transfer
        </Button>
      </Box>

      <TransferDialog
        open={openDialog}
        onClose={handleDialogClose}
        transfer={selectedTransfer}
        addTransfer={addTransfer}
        updateTransfer={updateTransfer}
      />

      <DataGrid
        rows={transfers}
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

export default TransferList;
