'use client';

import { ResponseList } from '@/@types/api';
import useFormatEmployees from '../_hooks/use-format-employees';
import EmployeeItem from './employee-item';

type EmployeeListProps = {
  employees: ResponseList<EmployeeProfile>['data'];
  positions: PositionResource[];
};

const EmployeeList = (props: EmployeeListProps) => {
  const { employees, positions } = props;

  const fmtEmployees = useFormatEmployees({
    employees: employees.pageItems,
    positions,
  });

  if (fmtEmployees.length === 0) {
    return (
      <p className="text-center font-bold min-h-[200px] grid place-items-center backdrop-blur-[2px] shadow-md rounded-md">
        Do not have any employees
      </p>
    );
  }

  return (
    <ul className="grid grid-cols-auto-fill-300 gap-4">
      {fmtEmployees.map((e: FmtEmployeeProfile) => (
        <li key={e.id}>
          <EmployeeItem {...e} />
        </li>
      ))}
    </ul>
  );
};

export default EmployeeList;
