import { Input } from '@/components/ui/input';
import Link from 'next/link';

const EmployeeActions = () => {
  return (
    <div className="flex justify-between flex-wrap gap-4">
      <form className="flex-1">
        <div className="flex gap-2 items-center">
          <div className="min-w-[300px] flex-1 max-w-[500px]">
            <Input placeholder="Search employee..." />
          </div>
          <button className="btn group/btn">Search</button>
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
};

export default EmployeeActions;
