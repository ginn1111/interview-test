import EmployeeItem from './employee-item';

const DUMMY = Array(10).fill(0);

const EmployeeList = () => {
  return (
    <ul className="grid grid-cols-auto-fit-300 gap-4">
      {DUMMY.map(() => (
        <li>
          <EmployeeItem />
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
