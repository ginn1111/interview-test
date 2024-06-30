import { EmployeeService } from '@/lib/api';
import { formDataToObject } from '@/utils/convert-do-form-data';
import { getQueryParamsEmployee } from '@/utils/get-query-params-employee';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

const getEmployees = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const { q, _start, _end } = getQueryParamsEmployee(searchParams);

  const employeesResponse = await EmployeeService.getEmployees({
    searchParams: {
      name_like: q,
      _start,
      _end,
    },
  });

  const employees = employeesResponse.data;

  const totalPage = employeesResponse.headers['x-total-count'];

  return NextResponse.json({
    message: 'success',
    statusCode: 200,
    data: {
      totalPages: isNaN(totalPage as number) ? 0 : parseInt(totalPage),
      totalItems: employees.length,
      pageItems: employees,
    },
  });
};

const addNewEmployee = async (req: NextRequest) => {
  const formData = await req.formData();

  await EmployeeService.createEmployee(
    formDataToObject(formData) as EmployeeProfile
  );

  return NextResponse.json({
    message: 'success',
    statusCode: 200,
  });
};

export { getEmployees as GET, addNewEmployee as POST };
