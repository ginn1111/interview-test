import { EmployeeService } from '@/lib/api';
import { formDataToObject } from '@/utils/convert-do-form-data';
import { NextRequest, NextResponse } from 'next/server';

export const revalidate = 0;

const deleteEmployee = async (req: NextRequest) => {
  const splitted = req.nextUrl.pathname.split('/');

  await EmployeeService.deleteEmployee(Number(splitted.at(-1)));

  return NextResponse.json({
    message: 'success',
    statusCode: 200,
  });
};

const getEmployee = async (req: NextRequest) => {
  const splitted = req.nextUrl.pathname.split('/');

  const response = await EmployeeService.getEmployee(Number(splitted.at(-1)));

  return NextResponse.json({
    message: 'success',
    statusCode: 200,
    data: response.data,
  });
};

const updateEmployee = async (req: NextRequest) => {
  const splitted = req.nextUrl.pathname.split('/');

  const formData = await req.formData();

  await EmployeeService.updateEmployee(
    Number(splitted.at(-1)),
    formDataToObject(formData)
  );

  return NextResponse.json({
    message: 'success',
    statusCode: 200,
  });
};

export { deleteEmployee as DELETE, getEmployee as GET, updateEmployee as PUT };
