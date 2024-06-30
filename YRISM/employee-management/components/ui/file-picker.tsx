import useDndFile from '@/app/(main)/_hooks/use-dnd-file';
import cx from '@/utils/cx';
import { ChangeEventHandler, InputHTMLAttributes, useId, useRef } from 'react';

type FilePickerProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'type' | 'id' | 'value'
> & {
  onChange: ChangeEventHandler<HTMLElement>;
  onDropFile?: (files: FileList) => void;
};

const FilePicker = ({ className, onDropFile, ...props }: FilePickerProps) => {
  const id = useId();
  const draggedRef = useRef<HTMLLabelElement>(null);

  const { isDragging } = useDndFile<HTMLLabelElement>({
    ref: draggedRef,
    onDrop: onDropFile,
  });

  return (
    <label
      ref={draggedRef}
      role="button"
      htmlFor={id}
      className={cx(
        `flex flex-col justify-center items-center border border-dashed border-neutral-300 
          px-4 py-3 rounded-md w-20 bg-gray-50 relative after:absolute after:inset-0 after:bg-white 
          after:rounded-md after:z-[-1] isolate transition duration-300`,
        {
          'shadow-[inset_0_0_30px_5px] shadow-primary border-primary after:scale-x-[30] after:scale-y-0':
            isDragging,
        },
        className
      )}
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
        className="text-neutral-400"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
      <p className="text-[12px] mt-1">Upload</p>
      <input
        type="file"
        id={id}
        className="hidden"
        value=""
        accept="image/*"
        {...props}
      />
    </label>
  );
};

export default FilePicker;
