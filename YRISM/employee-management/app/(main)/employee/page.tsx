import { fetchPositions } from '@/lib/api/server';
import EmployeeForm from '../_components/employee-form';

export const dynamic = 'force-dynamic';

const CreateEmployeePage = async () => {
  const positionResponse = await fetchPositions();
  const positions = positionResponse.data.data;

  return <EmployeeForm positionResources={positions} />;
};

export default CreateEmployeePage;
