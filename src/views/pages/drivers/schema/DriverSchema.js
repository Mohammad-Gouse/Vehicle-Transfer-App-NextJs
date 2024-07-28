// driverSchema.js
import * as yup from 'yup';

const phoneRegExp = /^[0-9]*$/; //  regex for  phone number
const nameRegExp = /^[A-Za-z][A-Za-z0-9]*$/; // Name must start with an alphabet

const driverSchema = yup.object().shape({
  name: yup
    .string()
    .min(3, 'Name must be at least 3 characters long')
    .matches(nameRegExp, 'Name must start with an alphabet')
    .required('Name is required'),
  phoneNumber: yup
    .string()
    .min(10, 'phoneNumber must be at least 10 characters long')
    .matches(phoneRegExp, 'Phone number is not valid')
    .required('Phone number is required')
});

export default driverSchema;
