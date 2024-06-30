'use client';

import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useRef } from 'react';

const EmployeeActions = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex justify-between flex-wrap gap-4">
      <form className="flex-1" onSubmit={handleSearch}>
        <div className="flex gap-2 items-center">
          <div className="min-w-[300px] flex-1 max-w-[500px]">
            <Input
              ref={inputRef}
              placeholder="Search employee..."
              defaultValue={searchParams.get('search') ?? ''}
            />
          </div>
          <button type="submit" className="btn group/btn">
            Search
          </button>
        </div>
      </form>
      <Link
        href="/employee"
        className="btn group/btn bg-primary bg-gradient-to-b from-primary to-secondary text-text-primary"
      >
        Add Employee
      </Link>
    </div>
  );

  function handleSearch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const search = inputRef.current?.value ?? '';
    router.push(`/?search=${search}`);
  }
};

export default EmployeeActions;
