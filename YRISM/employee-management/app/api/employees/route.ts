import { EmployeeService } from '@/lib/api';
import { DEFAULT_PAGE_NUMBER, DEFAULT_PAGE_SIZE } from '@/lib/api/utils';
import { formDataToObject } from '@/utils/convert-do-form-data';
import { NextRequest, NextResponse } from 'next/server';

const getEmployees = async (req: NextRequest) => {
  const searchParams = req.nextUrl.searchParams;

  const _pageNumber = searchParams.get('pageNumber');
  const _pageSize = searchParams.get('pageSize');

  const pageNumber =
    !_pageNumber || isNaN(_pageNumber as any)
      ? DEFAULT_PAGE_NUMBER
      : Number(_pageNumber as any);

  const pageSize =
    !_pageSize || isNaN(_pageSize as any)
      ? DEFAULT_PAGE_SIZE
      : Number(_pageSize as any);

  const q = searchParams.get('search')?.trim() || '';

  const _start = (pageNumber - 1) * pageSize;
  const _end = pageNumber * pageSize;

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
      totalPage: isNaN(totalPage as number) ? 0 : parseInt(totalPage),
      totalItems: employees.length,
      pageItems: employees,
    },
  });
};

const addNewEmployee = async (req: NextRequest) => {
  const formData = await req.formData();

  await EmployeeService.createEmployee(formDataToObject(formData));

  return NextResponse.json({
    message: 'success',
    statusCode: 200,
  });
};

export { getEmployees as GET, addNewEmployee as POST };
