import EmployeeActions from './_components/employee-actions';
import EmployeeList from './_components/employee-list';

const EmployeeListPage = () => {
  return (
    <section className="space-y-8">
      <EmployeeActions />
      <EmployeeList />
    </section>
  );
};

export default EmployeeListPage;
