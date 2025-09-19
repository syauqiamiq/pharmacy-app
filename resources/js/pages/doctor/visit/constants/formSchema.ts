import * as yup from 'yup';

export const formSchema = yup
    .object({
        patient_complaint: yup.string().required('Keluhan Pasien is Required'),
        present_illness: yup.string().optional(),
        past_illness: yup.string().optional(),
        allergy_history: yup.string().optional(),
        family_history: yup.string().optional(),
        madication_history: yup.string().optional(),
        physical_exam: yup.string().required('Pemeriksaan Fisik is Required'),
        note: yup.string().required('Catatan is Required'),
        anamnesisDetails: yup
            .array()
            .of(
                yup.object({
                    key: yup.string().required('Nama is required'),
                    value: yup.string().required('Nilai is required'),
                    unit: yup.string().required('Unit is required'),
                }),
            )
            .optional(),
    })
    .required();
