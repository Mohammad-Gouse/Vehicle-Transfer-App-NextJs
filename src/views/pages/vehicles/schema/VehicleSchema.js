import * as yup from 'yup';

const vehicleNumberRegExp = /^[A-Za-z0-9]*$/; // Regex for vehicle number: alphanumeric
const vehicleTypeRegExp = /^[A-Za-z][A-Za-z0-9]*$/; // Regex for vehicle type: start with an alphabet

const vehicleSchema = yup.object().shape({
  vehicleNumber: yup
    .string()
    .min(3, 'Vehicle number must be at least 3 characters long')
    .matches(vehicleNumberRegExp, 'Vehicle number can only contain alphabets and numbers')
    .required('Vehicle number is required'),
  vehicleType: yup
    .string()
    .min(3, 'Vehicle type must be at least 3 characters long')
    .matches(vehicleTypeRegExp, 'Vehicle type must start with an alphabet')
    .required('Vehicle type is required')
});

export default vehicleSchema;
