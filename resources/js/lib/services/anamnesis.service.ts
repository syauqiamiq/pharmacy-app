import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants/api';
import { IApiResponse } from '../interfaces/api.interface';
import { IAnamnesisResponse, ICreateAnamnesisPayload } from '../interfaces/services/anamnesis.interface';

// Query Keys
const QKEY_ANAMNESIS = 'QKEY_ANAMNESIS';

// Create Anamnesis Mutation
const useCreateAnamnesis = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: ICreateAnamnesisPayload): Promise<IApiResponse<IAnamnesisResponse>> => {
            // Convert to FormData
            const formData = new FormData();

            // Add basic fields
            formData.append('visit_id', payload.visit_id);

            if (payload.patient_complaint) {
                formData.append('patient_complaint', payload.patient_complaint);
            }
            if (payload.present_illness) {
                formData.append('present_illness', payload.present_illness);
            }
            if (payload.past_illness) {
                formData.append('past_illness', payload.past_illness);
            }
            if (payload.allergy_history) {
                formData.append('allergy_history', payload.allergy_history);
            }
            if (payload.family_history) {
                formData.append('family_history', payload.family_history);
            }
            if (payload.madication_history) {
                formData.append('madication_history', payload.madication_history);
            }
            if (payload.physical_exam) {
                formData.append('physical_exam', payload.physical_exam);
            }
            if (payload.note) {
                formData.append('note', payload.note);
            }

            // Add anamnesis details as JSON
            if (payload.anamnesis_details && payload.anamnesis_details.length > 0) {
                payload.anamnesis_details.forEach((detail, index) => {
                    formData.append(`anamnesis_details[${index}][key]`, detail.key);
                    formData.append(`anamnesis_details[${index}][value]`, detail.value);
                    formData.append(`anamnesis_details[${index}][unit]`, detail.unit || '');
                });
            }

            return axios
                .post(`${API_BASE_URL}/api/v1/anamnesis`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => res.data);
        },
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: [QKEY_ANAMNESIS] });
        },
    });
};

// Update Anamnesis Mutation
const useUpdateAnamnesis = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id, payload }: { id: string; payload: Partial<ICreateAnamnesisPayload> }): Promise<IApiResponse<IAnamnesisResponse>> => {
            // Convert to FormData
            const formData = new FormData();

            // Add _method for Laravel PATCH
            formData.append('_method', 'PATCH');

            // Add basic fields
            if (payload.patient_complaint !== undefined) {
                formData.append('patient_complaint', payload.patient_complaint);
            }
            if (payload.present_illness !== undefined) {
                formData.append('present_illness', payload.present_illness);
            }
            if (payload.past_illness !== undefined) {
                formData.append('past_illness', payload.past_illness);
            }
            if (payload.allergy_history !== undefined) {
                formData.append('allergy_history', payload.allergy_history);
            }
            if (payload.family_history !== undefined) {
                formData.append('family_history', payload.family_history);
            }
            if (payload.madication_history !== undefined) {
                formData.append('madication_history', payload.madication_history);
            }
            if (payload.physical_exam !== undefined) {
                formData.append('physical_exam', payload.physical_exam);
            }
            if (payload.note !== undefined) {
                formData.append('note', payload.note);
            }

            // Add anamnesis details
            if (payload.anamnesis_details) {
                payload.anamnesis_details.forEach((detail, index) => {
                    formData.append(`anamnesis_details[${index}][key]`, detail.key);
                    formData.append(`anamnesis_details[${index}][value]`, detail.value);
                    formData.append(`anamnesis_details[${index}][unit]`, detail.unit || '');
                });
            }

            return axios
                .post(`${API_BASE_URL}/api/v1/anamnesis/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then((res) => res.data);
        },
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: [QKEY_ANAMNESIS] });
        },
    });
};

// Delete Anamnesis Mutation
const useDeleteAnamnesis = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (id: string): Promise<IApiResponse<null>> => {
            return axios.delete(`${API_BASE_URL}/api/v1/anamnesis/${id}`).then((res) => res.data);
        },
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: [QKEY_ANAMNESIS] });
        },
    });
};

export { useCreateAnamnesis, useDeleteAnamnesis, useUpdateAnamnesis };
