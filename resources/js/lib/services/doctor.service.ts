import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { IPaginateRequest } from '../components/molecules/table/interfaces';
import { API_BASE_URL } from '../constants/api';
import { getNextPageParams } from '../functions/infinite-scroll-helper';
import { generateUrlParams } from '../functions/param-helper.function';
import { IApiResponse } from '../interfaces/api.interface';
import { IDoctorResponse } from '../interfaces/services/doctor.interface';

// Query Keys
export const QKEY_INFINITE = 'infinite';
export const QKEY_DOCTOR = 'QKEY_DOCTOR';

const useInfiniteGetAllDoctor = (paginateRequest: IPaginateRequest) => {
    return useInfiniteQuery({
        queryKey: [QKEY_INFINITE, QKEY_DOCTOR, paginateRequest],
        queryFn: async ({ pageParam }) => {
            const url = paginateRequest
                ? `${API_BASE_URL}/api/v1/doctor?${generateUrlParams({ ...paginateRequest, page: pageParam })}`
                : `${API_BASE_URL}/api/v1/doctor`;
            return axios.get(url).then((res) => res.data);
        },
        initialPageParam: paginateRequest.page,
        getNextPageParam: (res) => getNextPageParams(res),
        select: (data) => data.pages.flatMap((page) => page.data),
    });
};

const useGetAllDoctor = (paginateRequest?: IPaginateRequest) =>
    useQuery({
        queryKey: [QKEY_DOCTOR, { ...paginateRequest }],
        queryFn: async (): Promise<IApiResponse<IDoctorResponse[]>> => {
            const url = paginateRequest ? `${API_BASE_URL}/api/v1/doctor?${generateUrlParams(paginateRequest)}` : `${API_BASE_URL}/api/v1/doctor`;
            return axios.get(url).then((res) => res.data);
        },
    });

const useGetDoctorById = (doctorId: string) =>
    useQuery({
        queryKey: [QKEY_DOCTOR, doctorId],
        queryFn: async (): Promise<IApiResponse<IDoctorResponse>> => axios.get(`${API_BASE_URL}/api/v1/doctor/${doctorId}`).then((res) => res.data),
    });

export { useGetAllDoctor, useGetDoctorById, useInfiniteGetAllDoctor };
