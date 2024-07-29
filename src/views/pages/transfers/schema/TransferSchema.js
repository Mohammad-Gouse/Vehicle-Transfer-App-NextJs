import * as yup from 'yup';

const TransferSchema = yup.object().shape({
  fromDriverId: yup
    .number()
    .required('From Driver ID is required')
    .positive('From Driver ID must be positive')
    .integer('From Driver ID must be an integer'),
  toDriverId: yup
    .number()
    .required('To Driver ID is required')
    .positive('To Driver ID must be positive')
    .integer('To Driver ID must be an integer'),
  vehicleId: yup
    .number()
    .required('Vehicle ID is required')
    .positive('Vehicle ID must be positive')
    .integer('Vehicle ID must be an integer'),
  transferDate: yup
    .date()
    .required('Transfer date is required')
    .typeError('Invalid date format'),
});

export default TransferSchema;
