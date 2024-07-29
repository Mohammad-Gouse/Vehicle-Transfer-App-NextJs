import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import TransferSchema from '../schema/TransferSchema';

import { useDriverContext } from '@/context/DriverContext';
import { useVehicleContext } from '@/context/VehicleContext';

const TransferDialog = ({ open, onClose, transfer = null, addTransfer, updateTransfer }) => {
  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(TransferSchema),
  });

  const { drivers, fetchDrivers } = useDriverContext();
  const { vehicles, fetchVehicles } = useVehicleContext();

  const [fromDriverId, setFromDriverId] = useState(transfer ? transfer.fromDriver.id : '');
  const [toDriverId, setToDriverId] = useState(transfer ? transfer.toDriver.id : '');
  const [vehicleId, setVehicleId] = useState(transfer ? transfer.vehicle.id : '');
  const [transferDate, setTransferDate] = useState(transfer ? transfer.transferDate : '');

  useEffect(() => {
    if (transfer) {
      setFromDriverId(transfer.fromDriver.id);
      setToDriverId(transfer.toDriver.id);
      setVehicleId(transfer.vehicle.id);
      setTransferDate(transfer.transferDate);
      reset(transfer);
    } else {
      reset({
        fromDriverId: '',
        toDriverId: '',
        vehicleId: '',
        transferDate: '',
      });
    }
  }, [transfer]);

  const onSubmit = async (data) => {
    const transferData = {
      fromDriverId: data.fromDriverId,
      toDriverId: data.toDriverId,
      vehicleId: data.vehicleId,
      transferDate: data.transferDate,
    };

    if (transfer) {
      await updateTransfer(transfer.id, transferData);
    } else {
      await addTransfer(transferData);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{transfer ? 'Edit Transfer' : 'Create Transfer'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl fullWidth margin="normal">
            <InputLabel>From Driver</InputLabel>
            <Controller
              name="fromDriverId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  label="From Driver"
                  onChange={(e) => {
                    field.onChange(e);
                    setFromDriverId(e.target.value);
                  }}
                  error={!!errors.fromDriverId}
                >
                  {drivers.map((driver) => (
                    <MenuItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.fromDriverId && <p>{errors.fromDriverId.message}</p>}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>To Driver</InputLabel>
            <Controller
              name="toDriverId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  label="To Driver"
                  onChange={(e) => {
                    field.onChange(e);
                    setToDriverId(e.target.value);
                  }}
                  error={!!errors.toDriverId}
                >
                  {drivers.map((driver) => (
                    <MenuItem key={driver.id} value={driver.id}>
                      {driver.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.toDriverId && <p>{errors.toDriverId.message}</p>}
          </FormControl>

          <FormControl fullWidth margin="normal">
            <InputLabel>Vehicle</InputLabel>
            <Controller
              name="vehicleId"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select
                  {...field}
                  label="Vehicle"
                  onChange={(e) => {
                    field.onChange(e);
                    setVehicleId(e.target.value);
                  }}
                  error={!!errors.vehicleId}
                >
                  {vehicles.map((vehicle) => (
                    <MenuItem key={vehicle.id} value={vehicle.id}>
                      {vehicle.vehicleNumber}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
            {errors.vehicleId && <p>{errors.vehicleId.message}</p>}
          </FormControl>

          <Controller
            name="transferDate"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="normal"
                label="Transfer Date"
                type="date"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                onChange={(e) => {
                  field.onChange(e);
                  setTransferDate(e.target.value);
                }}
                error={!!errors.transferDate}
                helperText={errors.transferDate ? errors.transferDate.message : ''}
              />
            )}
          />

          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary">
              {transfer ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TransferDialog;
