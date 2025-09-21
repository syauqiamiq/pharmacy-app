import * as yup from 'yup';

export const formSchema = yup
    .object({
        name: yup.string().required('Nama Pasien is Required'),
        medic_record_number: yup.string().required('Nomor Rekam Medis is Required'),
    })
    .required();
