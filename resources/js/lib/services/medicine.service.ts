import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { API_BASE_URL } from '../constants/api';
import { IApiResponse } from '../interfaces/api.interface';
import { IMedicineResponse } from '../interfaces/services/medicine.interface';

const QKEY_ALL_MEDICINE = 'QKEY_ALL_MEDICINE';
const useGetAllMedicine = () =>
    useQuery({
        queryKey: [QKEY_ALL_MEDICINE],
        queryFn: async (): Promise<IApiResponse<IMedicineResponse[]>> =>
            axios.get(`${API_BASE_URL}/api/v1/medicines`).then((res) => res.data),
    });



export { useGetAllMedicine };

