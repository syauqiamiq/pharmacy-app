import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IPaginateRequest } from '../components/molecules/table/interfaces';
import { API_BASE_URL } from '../constants/api';
import { generateUrlParams } from '../functions/param-helper.function';
import { IApiResponse } from '../interfaces/api.interface';
import { IUpdateVisitPayload, IVisitResponse } from '../interfaces/services/visit.interface';

const QKEY_MY_VISIT = 'QKEY_MY_VISIT';
const useGetAllMyVisit = (paginateRequest: IPaginateRequest) =>
    useQuery({
        queryKey: [QKEY_MY_VISIT, { ...paginateRequest }],
        queryFn: async (): Promise<IApiResponse<IVisitResponse[]>> =>
            axios.get(`${API_BASE_URL}/api/v1/visit/my?${generateUrlParams(paginateRequest)}`).then((res) => res.data),
    });

const QKEY_VISIT = 'QKEY_VISIT';
const useGetVisitByID = (visitId: string) =>
    useQuery({
        queryKey: [QKEY_VISIT, visitId],
        queryFn: async (): Promise<IApiResponse<IVisitResponse>> => axios.get(`${API_BASE_URL}/api/v1/visit/${visitId}`).then((res) => res.data),
    });

const useUpdateVisit = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IUpdateVisitPayload): Promise<IApiResponse<IVisitResponse>> => {
            const { visit_id, ...rest } = payload;
            return axios.patch(`${API_BASE_URL}/api/v1/visit/${visit_id}`, rest).then((res) => res.data);
        },
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: [QKEY_VISIT] });
        },
    });
};

export { useGetAllMyVisit, useGetVisitByID, useUpdateVisit };
