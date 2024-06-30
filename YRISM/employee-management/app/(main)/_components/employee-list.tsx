'use client';

import { ResponseList } from '@/@types/api';
import Loading from '@/components/loading';
import useFetch from '@/hooks/use-fetch';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { deleteEmployee, fetchEmployees } from '@/lib/api/server';
import { getQueryParamsEmployee } from '@/utils/get-query-params-employee';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import useFormatEmployees from '../_hooks/use-format-employees';
import EmployeeItem from './employee-item';

type EmployeeListProps = {
  employees: ResponseList<EmployeeProfile>['data'];
  positions: PositionResource[];
};

const EmployeeList = (props: EmployeeListProps) => {
  const { employees, positions } = props;
  const searchParams = useSearchParams();
  const router = useRouter();

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
  }, [employees.pageItems]);

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
    <div>
      <ul className="grid grid-cols-auto-fill-300 gap-4">
        {fmtEmployees.map((e: FmtEmployeeProfile, idx) => (
          <li key={`${e.id}${idx}`} className="group relative overflow-hidden">
            <button
              onClick={() => {
                handleDeleteEmployee(e.id);
              }}
              className="group-hover:translate-x-0 translate-x-[200%] transition duration-300 absolute right-4 top-2 bg-gray-50 hover:bg-danger hover:text-white cursor-pointer rounded-full p-1 z-50"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M18 6 6 18" />
                <path d="m6 6 12 12" />
              </svg>
            </button>
            <Link href={`/employee/${e.id}`}>
              <EmployeeItem
                {...e}
                onDelete={() => handleDeleteEmployee(e.id)}
              />
            </Link>
          </li>
        ))}
        <div ref={reachEndRef} />
      </ul>
      {loading && (
        <div className="flex justify-center">
          <Loading.Inline />
        </div>
      )}
    </div>
  );

  async function handleDeleteEmployee(id: number) {
    try {
      const response = await deleteEmployee(id);
      if (response.data.statusCode === 200) {
        router.refresh();
      }
    } catch {
      toast.error('Something went wrong');
    }
  }
};

export default EmployeeList;
