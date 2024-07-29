// components/DriverDialog.js
import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import driverSchema from '../schema/DriverSchema';

const DriverDialog = ({ open, onClose, driver=Null, addDriver, updateDriver }) => {
//   const { reset } = useForm();
const { control, reset, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(driverSchema)
  });

  const [name, setName] = useState(driver ? driver.name : '');
  const [phoneNumber, setPhoneNumber] = useState(driver ? driver.phoneNumber : '');
  const [profilePhoto, setProfilePhoto] = useState(null);

//   useEffect(() => {
//     if (driver) {
//       setName(driver.name);
//     }
//   }, [driver]);


  useEffect(() => {
    if (driver) {
      setName(driver.name);
      setPhoneNumber(driver.phoneNumber)
      setProfilePhoto(driver.profilePhoto)
      reset(driver);
    } else {
        setName('');
        setPhoneNumber('')
        setProfilePhoto(null)
        reset({
          name: '',
          phoneNumber: '',
          profilePhoto: null,
        });
      }
  }, [driver]);


const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('phoneNumber', data.phoneNumber);

    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }

    if (driver) {
      await updateDriver(driver.id, formData);
    } else {
      await addDriver(formData);
    }

    if (onClose) {
      onClose();
    }
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{driver ? 'Edit Driver' : 'Create Driver'}</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* <TextField
            margin="dense"
            label="Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
          /> */}

<Controller
            name="name"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Name"
                fullWidth
                onChange={(e) => {
                    field.onChange(e);
                    setName(e.target.value);
                  }}
                error={!!errors.name}
                helperText={errors.name ? errors.name.message : ''}
              />
            )}
          />

          {/* <TextField
            margin="dense"
            label="Phone Number"
            fullWidth
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          /> */}

<Controller
            name="phoneNumber"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <TextField
                {...field}
                margin="dense"
                label="Phone Number"
                fullWidth
                onChange={(e) => {
                    field.onChange(e);
                    setPhoneNumber(e.target.value);
                  }}
                error={!!errors.phoneNumber}
                helperText={errors.phoneNumber ? errors.phoneNumber.message : ''}
              />
            )}
          />

          {/* <input
            type="file"
            onChange={(e) => setProfilePhoto(e.target.files[0])}
          /> */}

            <input
            type="file"
            onChange={(e) => setProfilePhoto(e.target.files[0])}
          />
          {errors.profilePhoto && <p>{errors.profilePhoto.message}</p>}
            
          <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button type="submit" color="primary">
              {driver ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DriverDialog;
