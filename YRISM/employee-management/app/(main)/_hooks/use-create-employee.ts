import { useForm } from 'react-hook-form';

const useCreateEmployee = () => {
  const form = useForm<EmployeeProfile>();
};

export default useCreateEmployee;
