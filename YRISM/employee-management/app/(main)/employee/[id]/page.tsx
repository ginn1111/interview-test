import { fetchPositions, getEmployee } from '@/lib/api/server';
import EmployeeForm from '../../_components/employee-form';

export const dynamic = 'force-dynamic';

const EmployeeDetailPage = async ({ params }: { params: { id: number } }) => {
  const employeeResponse = await getEmployee(params.id);
  const employee = employeeResponse.data.data;

  const positionResponse = await fetchPositions();
  const positions = positionResponse.data.data;

  return <EmployeeForm positionResources={positions} employee={employee} />;
};

export default EmployeeDetailPage;
