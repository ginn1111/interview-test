import { EmployeesRequest } from '@/@types/api';
import HTTPRequest from '@/config/api';
import { AxiosResponse } from 'axios';
import { createUrlWithSearchParams } from './utils';

export const getEmployees = ({
  searchParams,
}: EmployeesRequest): Promise<AxiosResponse<Array<EmployeeProfile>>> =>
  HTTPRequest.get(createUrlWithSearchParams('/employees', searchParams));

export const createEmployee = (data: EmployeeProfile) =>
  HTTPRequest.post('/employees', data);

export const deleteEmployee = (id: number) =>
  HTTPRequest.delete(`/employees/${id}`);

export const getEmployee = (id: number) => HTTPRequest.get(`/employees/${id}`);

export const updateEmployee = (id: number, data: EmployeeProfile) =>
  HTTPRequest.put(`/employees/${id}`, data);
