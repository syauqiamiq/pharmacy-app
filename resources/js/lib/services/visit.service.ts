import { IPaginateRequest } from "../components/molecules/table/interfaces";
import { IApiResponse } from "../interfaces/api.interface";
import { useQuery } from '@tanstack/react-query';
import { IVisitResponse } from "../interfaces/services/visit.interface";
import axios from "axios";
import { generateUrlParams } from "../functions/param-helper.function";
import { API_BASE_URL } from "../constants/api";


const QKEY_MY_VISIT = "QKEY_MY_VISIT";
const useGetAllMyVisit = (paginateRequest: IPaginateRequest) =>
  useQuery({
    queryKey: [QKEY_MY_VISIT, { ...paginateRequest }],
    queryFn: async (): Promise<IApiResponse<IVisitResponse[]>> =>
      axios
        .get(`${API_BASE_URL}/api/v1/visit/my?${generateUrlParams(paginateRequest)}`)
        .then((res) => res.data),
  });

export { useGetAllMyVisit };