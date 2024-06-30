import { RefObject, useEffect, useState } from 'react';

type UseDndFile<T extends HTMLElement = HTMLElement> = {
  ref: RefObject<T>;
  onDrop?: (files: FileList) => void;
};

const draggingEvents = ['dragover'] as const;

const useDndFile = <T extends HTMLElement = HTMLElement>(
  props: UseDndFile<T>
) => {
  const [isDragging, setIsDragging] = useState(false);
  const { ref, onDrop } = props;

  useEffect(() => {
    const handleDragenter = (evt: DragEvent) => {
      evt.preventDefault();
      setIsDragging(true);
    };

    const handleDrop = (evt: DragEvent) => {
      evt.preventDefault();
      if (evt.dataTransfer?.files?.length) {
        onDrop?.(evt.dataTransfer.files);
      }

      setIsDragging(false);
    };

    const handleDragLeave = () => {
      setIsDragging(false);
    };

    draggingEvents.forEach((evtName) => {
      ref.current?.addEventListener(evtName, handleDragenter);
    });

    ref.current?.addEventListener('drop', handleDrop);
    ref.current?.addEventListener('dragleave', handleDragLeave);

    return () => {
      draggingEvents.forEach((evtName) => {
        ref.current?.removeEventListener(evtName, handleDragenter);
      });
      ref.current?.removeEventListener('drop', handleDrop);
      ref.current?.removeEventListener('dragleave', handleDragLeave);
    };
  }, []);

  return {
    isDragging,
  };
};

export default useDndFile;
