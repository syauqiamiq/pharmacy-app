import * as yup from 'yup';

export const formSchema = yup
    .object({
        visit_date: yup.string().required('Tanggal Kunjungan is Required'),
        doctor_id: yup.string().required('Dokter is Required'),
        patient_id: yup.string().required('Pasien is Required'),
    })
    .required();
