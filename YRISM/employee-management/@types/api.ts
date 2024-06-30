export interface Response<T> {
  message: string;
  statusCode: number;
  data: T;
}

export type ResponseList<T = unknown> = Response<{
  totalItems: string;
  totalPages: string;
  pageItems: T[];
}>;

export interface EmployeesResponse extends ResponseList<EmployeeProfile> {}
export interface EmployeesRequest {
  searchParams: Record<
    'name_like' | '_start' | '_end',
    NullishValue<string | number>
  >;
}

export interface PositionResponse extends ResponseList<Position> {}
