import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import vehicleSchema from '../schema/VehicleSchema';

const VehicleDialog = ({ open, onClose, vehicle = null, addVehicle, updateVehicle }) => {
  const { control, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(vehicleSchema)
  });

  const [vehicleNumber, setVehicleNumber] = useState(vehicle ? vehicle.vehicleNumber : '');
  const [vehicleType, setVehicleType] = useState(vehicle ? vehicle.vehicleType : '');
  const [pucCertificate, setPucCertificate] = useState(null);
  const [insuranceCertificate, setInsuranceCertificate] = useState(null);

  useEffect(() => {
    if (vehicle) {
      setVehicleNumber(vehicle.vehicleNumber);
      setVehicleType(vehicle.vehicleType);
      setPucCertificate(vehicle.pucCertificate);
      setInsuranceCertificate(vehicle.insuranceCertificate);
      reset(vehicle);
      
    } else {
        setVehicleNumber('');
        setVehicleType('');
        setPucCertificate(null);
        setInsuranceCertificate(null);
        reset({
          vehicleNumber: '',
          vehicleType: '',
          pucCertificate: null,
          insuranceCertificate: null,
        });
      }
  }, [vehicle]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('vehicleNumber', data.vehicleNumber);
    formData.append('vehicleType', data.vehicleType);

    console.log(pucCertificate, insuranceCertificate)

    if (pucCertificate) {
      formData.append('pucCertificate', pucCertificate);
    }

    if (insuranceCertificate) {
      formData.append('insuranceCertificate', insuranceCertificate);
    }

    if (vehicle) {
      await updateVehicle(vehicle.id, formData);
    } else {
      await addVehicle(formData);
    }

    if (onClose) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{vehicle ? 'Edit Vehicle' : 'Create Vehicle'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            name="vehicleNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Vehicle Number"
                fullWidth
                onChange={(e) => {
                  field.onChange(e);
                  setVehicleNumber(e.target.value);
                }}
                error={!!errors.vehicleNumber}
                helperText={errors.vehicleNumber ? errors.vehicleNumber.message : ''}
              />
            )}
          />
          <Controller
            name="vehicleType"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Vehicle Type"
                fullWidth
                onChange={(e) => {
                  field.onChange(e);
                  setVehicleType(e.target.value);
                }}
                error={!!errors.vehicleType}
                helperText={errors.vehicleType ? errors.vehicleType.message : ''}
              />
            )}
          />
          <p>Puc Certificate</p>
          <input
            type="file"
            onChange={(e) => setPucCertificate(e.target.files[0])}
          />

        <p>Insurance Certificate</p>
          <input
            type="file"
            onChange={(e) => setInsuranceCertificate(e.target.files[0])}
          />
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary">
              {vehicle ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default VehicleDialog;
