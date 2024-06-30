import { EmployeesRequest, Response, ResponseList } from '@/@types/api';
import { HTTPHostRequest } from '@/config/api';
import { AxiosResponse } from 'axios';
import { createUrlWithSearchParams } from './utils';

const BASE_URL = process.env.NEXT_PUBLIC_HOST_URL + '/api';

export const fetchEmployees = (
  searchParams: EmployeesRequest['searchParams']
): Promise<AxiosResponse<ResponseList<EmployeeProfile>>> => {
  return HTTPHostRequest.get(
    createUrlWithSearchParams(`${BASE_URL}/employees`, searchParams)
  );
};

export const fetchPositions = (): Promise<
  AxiosResponse<Response<PositionResource[]>>
> => {
  return HTTPHostRequest.get(
    createUrlWithSearchParams(`${BASE_URL}/positions`)
  );
};

export const addNewEmployee = (data: any) => {
  return HTTPHostRequest.post(`${BASE_URL}/employees`, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
