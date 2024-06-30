'use client';

import { ResponseList } from '@/@types/api';
import useFetch from '@/hooks/use-fetch';
import { fetchEmployees } from '@/lib/api/server';
import { getQueryParamsEmployee } from '@/utils/get-query-params-employee';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import useFormatEmployees from '../_hooks/use-format-employees';
import useIntersectionObserver from '../_hooks/use-intersection-observer';
import EmployeeItem from './employee-item';

type EmployeeListProps = {
  employees: ResponseList<EmployeeProfile>['data'];
  positions: PositionResource[];
};

const EmployeeList = (props: EmployeeListProps) => {
  const { employees, positions } = props;
  const searchParams = useSearchParams();

  const [employeeList, setEmployeeList] = useState(employees.pageItems);

  const {
    q: search,
    pageNumber,
    pageSize,
  } = getQueryParamsEmployee(searchParams);

  const paginateRef = useRef({
    pageNumber: pageNumber + 1,
    pageSize,
    hasNext: employees.totalItems < employees.totalPages,
  });

  useEffect(() => {
    setEmployeeList([...employees.pageItems]);
    paginateRef.current = {
      pageNumber: pageNumber + 1,
      pageSize,
      hasNext: employees.totalItems < employees.totalPages,
    };
  }, [searchParams.get('search')]);

  const { loading, handleFetch } = useFetch({
    isInitFetch: false,
    fetchFn: fetchEmployees,
    onSuccess: (data) => {
      const responseData = data.data;
      if (
        paginateRef.current.pageNumber * paginateRef.current.pageSize <
        responseData.totalPages
      ) {
        paginateRef.current.pageNumber++;
      } else {
        paginateRef.current.hasNext = false;
      }

      setEmployeeList((prev) => [...prev, ...responseData.pageItems]);
    },
  });

  const reachEndRef = useRef(null);
  useIntersectionObserver(reachEndRef, () => {
    if (!loading && paginateRef.current.hasNext) {
      handleFetch({
        search,
        pageNumber: paginateRef.current.pageNumber,
        pageSize: paginateRef.current.pageSize,
      });
    }
  });

  const fmtEmployees = useFormatEmployees({
    employees: employeeList,
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
      {fmtEmployees.map((e: FmtEmployeeProfile, idx) => (
        <li key={idx}>
          <EmployeeItem {...e} />
        </li>
      ))}
      <div ref={reachEndRef} />
    </ul>
  );
};

export default EmployeeList;
