import * as yup from 'yup';

export const prescriptionSchema = yup
    .object({
        doctor_note: yup.string().required('Catatan Dokter is Required'),
        prescriptionDetails: yup
            .array()
            .of(
                yup.object({
                    medicine_id: yup.string().required('ID Obat is required'),
                    medicine_name: yup.string().required('Nama Obat is required'),
                    dosage: yup.string().required('Dosis is required'),
                    frequency: yup.string().required('Frekuensi is required'),
                    duration: yup.string().required('Durasi is required'),
                    note: yup.string().optional(),
                }),
            )
            .optional(),
    })
    .required();
