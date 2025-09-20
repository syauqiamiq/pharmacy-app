import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { IPaginateRequest } from '../components/molecules/table/interfaces';
import { API_BASE_URL } from '../constants/api';
import { generateUrlParams } from '../functions/param-helper.function';
import { IApiResponse } from '../interfaces/api.interface';
import { IPrescriptionInvoiceResponse, IUpdatePrescriptionInvoicePayload } from '../interfaces/services/prescription-invoice';
import { QKEY_PRESCRIPTION } from './prescription.service';

// Query Keys
const QKEY_PRESCRIPTION_INVOICE = 'QKEY_PRESCRIPTION_INVOICE';

const useGetAllPrescriptionInvoices = (paginateRequest: IPaginateRequest) =>
    useQuery({
        queryKey: [QKEY_PRESCRIPTION_INVOICE, { ...paginateRequest }],
        queryFn: async (): Promise<IApiResponse<IPrescriptionInvoiceResponse[]>> =>
            axios.get(`${API_BASE_URL}/api/v1/prescription-invoice?${generateUrlParams(paginateRequest)}`).then((res) => res.data),
    });
const useGetPrescriptionInvoiceById = (prescriptionInvoiceId: string) =>
    useQuery({
        queryKey: [QKEY_PRESCRIPTION_INVOICE, prescriptionInvoiceId],
        queryFn: async (): Promise<IApiResponse<IPrescriptionInvoiceResponse>> =>
            axios.get(`${API_BASE_URL}/api/v1/prescription-invoice/${prescriptionInvoiceId}`).then((res) => res.data),
    });

const useUpdatePrescriptionInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (payload: IUpdatePrescriptionInvoicePayload): Promise<IApiResponse<IPrescriptionInvoiceResponse>> => {
            const { prescription_invoice_id, ...rest } = payload;
            return axios.patch(`${API_BASE_URL}/api/v1/prescription-invoice/${prescription_invoice_id}`, rest).then((res) => res.data);
        },
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: [QKEY_PRESCRIPTION_INVOICE] });
            queryClient.invalidateQueries({ queryKey: [QKEY_PRESCRIPTION] });
        },
    });
};

const useDeletePrescriptionInvoice = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ prescription_invoice_id }: { prescription_invoice_id: string }): Promise<IApiResponse<IPrescriptionInvoiceResponse>> => {
            return axios.delete(`${API_BASE_URL}/api/v1/prescription-invoice/${prescription_invoice_id}`).then((res) => res.data);
        },
        onSuccess: () => {
            // Invalidate related queries
            queryClient.invalidateQueries({ queryKey: [QKEY_PRESCRIPTION_INVOICE] });
        },
    });
};

export { useDeletePrescriptionInvoice, useGetAllPrescriptionInvoices, useGetPrescriptionInvoiceById, useUpdatePrescriptionInvoice };
