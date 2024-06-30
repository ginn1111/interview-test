import { EmployeesRequest } from '@/@types/api';
import HTTPRequest from '@/config/api';
import { AxiosResponse } from 'axios';
import { createUrlWithSearchParams } from './utils';

export const getEmployees = async ({
  searchParams,
}: EmployeesRequest): Promise<AxiosResponse<Array<EmployeeProfile>>> =>
  HTTPRequest.get(createUrlWithSearchParams('/employees', searchParams));

export const createEmployee = async (data: any) => {
  return HTTPRequest.post('/employees', data);
};
