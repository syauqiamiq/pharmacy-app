import * as yup from 'yup';

export const prescriptionSchema = yup
    .object({
        pharmacist_id: yup.string(),
        pharmacist_name: yup.string().required('Nama Apoteker is Required'),
        pharmacist_note: yup.string().required('Catatan Apoteker is Required'),
        status: yup.string().required('Status is Required'),
        prescriptionDetails: yup
            .array()
            .of(
                yup.object({
                    medicine_id: yup.string().required('Obat is required'),
                    medicine_name: yup.string().required('Nama Obat is required'),
                    dosage: yup.string().required('Dosis is required'),
                    frequency: yup.string().required('Frekuensi is required'),
                    duration: yup.string().required('Durasi is required'),
                    quantity: yup.number().typeError('Kuantitas harus berupa angka').required('Kuantitas is required'),
                    note: yup.string().optional(),
                }),
            )
            .optional(),
    })
    .required();
