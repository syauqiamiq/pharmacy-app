import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IPaginateRequest } from '../components/molecules/table/interfaces';
import { API_BASE_URL } from '../constants/api';
import { generateUrlParams } from '../functions/param-helper.function';
import { IApiResponse } from '../interfaces/api.interface';
import { ICreatePrescriptionPayload, IPrescriptionResponse, IUpdatePrescriptionPayload } from '../interfaces/services/prescription.interface';

// Query Keys
const QKEY_PRESCRIPTION = 'QKEY_PRESCRIPTION';

const useGetAllPrescriptionByAnamnesisId = (anamnesisId: string, paginateRequest: IPaginateRequest) =>
    useQuery({
        queryKey: [QKEY_PRESCRIPTION, { ...paginateRequest }],
        queryFn: async (): Promise<IApiResponse<IPrescriptionResponse[]>> =>
            axios.get(`${API_BASE_URL}/api/v1/prescription/anamnesis/${anamnesisId}?${generateUrlParams(paginateRequest)}`).then((res) => res.data),
    });

const useGetPrescriptionById = (prescriptionId: string) =>
    useQuery({
        queryKey: [QKEY_PRESCRIPTION, prescriptionId],
        queryFn: async (): Promise<IApiResponse<IPrescriptionResponse>> =>
            axios.get(`${API_BASE_URL}/api/v1/prescription/${prescriptionId}`).then((res) => res.data),
    });

const useGetAllPrescription = (paginateRequest: IPaginateRequest) =>
    useQuery({
        queryKey: [QKEY_PRESCRIPTION, { ...paginateRequest }],
        queryFn: async (): Promise<IApiResponse<IPrescriptionResponse[]>> =>
            axios.get(`${API_BASE_URL}/api/v1/prescription?${generateUrlParams(paginateRequest)}`).then((res) => res.data),
    });

const useCreatePrescription = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: ICreatePrescriptionPayload): Promise<IApiResponse<IPrescriptionResponse>> => {
            return axios.post(`${API_BASE_URL}/api/v1/prescription`, payload).then((res) => res.data);
        },
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: [QKEY_PRESCRIPTION] });
        },
    });
};

const useUpdatePrescription = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IUpdatePrescriptionPayload): Promise<IApiResponse<IPrescriptionResponse>> => {
            const { prescription_id, ...rest } = payload;
            return axios.patch(`${API_BASE_URL}/api/v1/prescription/${prescription_id}`, rest).then((res) => res.data);
        },
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: [QKEY_PRESCRIPTION] });
        },
    });
};

const useDeletePrescription = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ prescription_id }: { prescription_id: string }): Promise<IApiResponse<IPrescriptionResponse>> => {
            return axios.delete(`${API_BASE_URL}/api/v1/prescription/${prescription_id}`).then((res) => res.data);
        },
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: [QKEY_PRESCRIPTION] });
        },
    });
};

export {
    useCreatePrescription,
    useDeletePrescription,
    useGetAllPrescription,
    useGetAllPrescriptionByAnamnesisId,
    useGetPrescriptionById,
    useUpdatePrescription,
};
