import * as yup from 'yup';

export const prescriptionInvoiceSchema = yup
    .object({
        status: yup.string().required('Status is Required'),
    })
    .required();
