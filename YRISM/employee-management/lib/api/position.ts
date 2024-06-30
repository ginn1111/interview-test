import HTTPRequest from '@/config/api';
import { AxiosResponse } from 'axios';
import { createUrlWithSearchParams } from './utils';

export const getPositions = async (): Promise<AxiosResponse<Array<Position>>> =>
  HTTPRequest.get(createUrlWithSearchParams('/positions'));
