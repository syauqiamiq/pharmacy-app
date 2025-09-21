import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IPaginateRequest } from '../components/molecules/table/interfaces';
import { API_BASE_URL } from '../constants/api';
import { getNextPageParams } from '../functions/infinite-scroll-helper';
import { generateUrlParams } from '../functions/param-helper.function';
import { IApiResponse } from '../interfaces/api.interface';
import { ICreatePatientPayload, IPatientResponse, IUpdatePatientPayload } from '../interfaces/services/patient.interface';

// Query Keys
export const QKEY_PATIENT = 'QKEY_PATIENT';
const QKEY_INFINITE = 'infinite';

const useInfiniteGetAllPatient = (paginateRequest: IPaginateRequest) => {
    return useInfiniteQuery({
        queryKey: [QKEY_INFINITE, QKEY_PATIENT, paginateRequest],
        queryFn: async ({ pageParam }) => {
            const url = paginateRequest
                ? `${API_BASE_URL}/api/v1/patient?${generateUrlParams({ ...paginateRequest, page: pageParam })}`
                : `${API_BASE_URL}/api/v1/patient`;
            return axios.get(url).then((res) => res.data);
        },
        initialPageParam: paginateRequest.page,
        getNextPageParam: (res) => getNextPageParams(res),
        select: (data) => data.pages.flatMap((page) => page.data),
    });
};
const useGetAllPatient = (paginateRequest: IPaginateRequest) =>
    useQuery({
        queryKey: [QKEY_PATIENT, { ...paginateRequest }],
        queryFn: async (): Promise<IApiResponse<IPatientResponse[]>> =>
            axios.get(`${API_BASE_URL}/api/v1/patient?${generateUrlParams(paginateRequest)}`).then((res) => res.data),
    });

const useGetPatientById = (patientId: string) =>
    useQuery({
        queryKey: [QKEY_PATIENT, patientId],
        queryFn: async (): Promise<IApiResponse<IPatientResponse>> =>
            axios.get(`${API_BASE_URL}/api/v1/patient/${patientId}`).then((res) => res.data),
    });

const useCreatePatient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: ICreatePatientPayload): Promise<IApiResponse<IPatientResponse>> => {
            return axios.post(`${API_BASE_URL}/api/v1/patient`, payload).then((res) => res.data);
        },
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: [QKEY_PATIENT] });
        },
    });
};

const useUpdatePatient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IUpdatePatientPayload): Promise<IApiResponse<IPatientResponse>> => {
            const { patient_id, ...rest } = payload;
            return axios.patch(`${API_BASE_URL}/api/v1/patient/${patient_id}`, rest).then((res) => res.data);
        },
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: [QKEY_PATIENT] });
        },
    });
};

const useDeletePatient = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ patient_id }: { patient_id: string }): Promise<IApiResponse<IPatientResponse>> => {
            return axios.delete(`${API_BASE_URL}/api/v1/patient/${patient_id}`).then((res) => res.data);
        },
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: [QKEY_PATIENT] });
        },
    });
};

export { useCreatePatient, useDeletePatient, useGetAllPatient, useGetPatientById, useInfiniteGetAllPatient, useUpdatePatient };
