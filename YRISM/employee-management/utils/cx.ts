import clsx, { ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cx = (...classes: ClassValue[]) => twMerge(clsx(classes));

export default cx;
