import { EmployeesRequest } from '@/@types/api';
import { fetchEmployees, fetchPositions } from '@/lib/api/server';
import { notFound } from 'next/navigation';
import EmployeeActions from './_components/employee-actions';
import EmployeeList from './_components/employee-list';

export const dynamic = 'force-dynamic';

const EmployeeListPage = async ({
  searchParams,
}: {
  searchParams: EmployeesRequest['searchParams'];
}) => {
  let response;
  try {
    response = await Promise.all([
      fetchEmployees(searchParams),
      fetchPositions(),
    ]);
  } catch (error) {
    notFound();
  }

  if (!response) {
    notFound();
  }

  const employees = response[0].data.data;
  const positions = response[1].data.data;

  return (
    <section className="space-y-8">
      <EmployeeActions />
      <EmployeeList employees={employees} positions={positions} />
    </section>
  );
};

export default EmployeeListPage;
