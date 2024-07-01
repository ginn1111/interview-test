import FilePicker from '@/components/ui/file-picker';
import Form from '@/components/ui/form';
import Select from '@/components/ui/select';
import { fileToBase64 } from '@/hooks/use-upload-file';
import cx from '@/utils/cx';
import get from 'lodash/get';
import { ChangeEvent, useMemo, useState } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import useCalcRemainToolLg from '../_hooks/use-calc-remain-tool-lg';
import useFromToYear from '../_hooks/use-from-to-year';

type FormLanguageProps = {
  name: string;
  langsName: string;
  toolLanguages: ToolLanguageResource[];
  onRemove: () => void;
};

const FormLanguage = (props: FormLanguageProps) => {
  const { langsName, toolLanguages, name, onRemove } = props;

  const [uploading, setUploading] = useState(false);
  const {
    setValue,
    getValues,
    formState: { errors },
  } = useFormContext<Record<string, ToolLanguage>>();

  const toolLanguageErr = get(errors, name);

  const tlErrMsg = toolLanguageErr?.toolLanguageResourceId?.message;
  const fromErrMsg = toolLanguageErr?.from?.message;
  const toErrMsg = toolLanguageErr?.to?.message;

  const isTlLgErr = tlErrMsg || fromErrMsg || toErrMsg;

  const watchedLanguages = useWatch({
    name: langsName,
  }) as unknown as ToolLanguage[];

  const watchedFromYear = useWatch({
    name: `${name}.from`,
  });

  const watchedToYear = useWatch({
    name: `${name}.to`,
  });

  const { yearsToOptions, yearsFromOptions } = useFromToYear(watchedFromYear);

  const remainToolLanguages = useCalcRemainToolLg({
    originalToolLg: toolLanguages,
    selectedToolLg: watchedLanguages,
  });

  const tooLgOptions = useMemo(() => {
    return remainToolLanguages.map(({ toolLanguageResourceId, name }) => ({
      value: toolLanguageResourceId,
      label: name,
    }));
  }, [remainToolLanguages]);

  const originalToolLgOptions = useMemo(
    () =>
      toolLanguages.map(({ toolLanguageResourceId, name }) => ({
        value: toolLanguageResourceId,
        label: name,
      })),
    [toolLanguages]
  );

  return (
    <div className="space-y-4">
      <div>
        <Form.Label isRequired className={cx({ 'text-danger': isTlLgErr })}>
          Tool/Language
        </Form.Label>
        <div className="flex gap-2 items-center w-full flex-wrap">
          <Controller
            name={`${name}.toolLanguageResourceId`}
            render={({ field, fieldState: { error } }) => {
              return (
                <Select
                  placeholder="Choose a tool/language..."
                  className={cx(
                    'custom-select min-w-full md:min-w-[270px] flex-1',
                    {
                      error: error?.message,
                    }
                  )}
                  value={
                    originalToolLgOptions.find(
                      (tl) => tl.value === field.value
                    ) ?? null
                  }
                  onChange={(singleValue) =>
                    field.onChange(singleValue?.value ?? null)
                  }
                  options={tooLgOptions}
                />
              );
            }}
          />
          <Controller
            name={`${name}.from`}
            render={({ field, fieldState: { error } }) => {
              return (
                <Select
                  placeholder="From"
                  className={cx('custom-select w-[100px] flex-1 md:flex-none', {
                    error: error?.message,
                  })}
                  value={
                    yearsFromOptions.find(
                      (item) => item.value === field.value
                    ) ?? null
                  }
                  onChange={(singleValue) => {
                    const from = singleValue?.value ?? null;

                    if (watchedToYear && from && watchedToYear < from) {
                      setValue(`${name}.to`, null as any);
                    }

                    field.onChange(from);
                  }}
                  options={yearsFromOptions}
                />
              );
            }}
          />
          <Controller
            name={`${name}.to`}
            render={({ field, fieldState: { error } }) => {
              return (
                <Select
                  placeholder="To"
                  className={cx('custom-select w-[100px] flex-1 md:flex-none', {
                    error: error?.message,
                  })}
                  value={
                    yearsToOptions.find((item) => item.value === field.value) ??
                    null
                  }
                  onChange={(singleValue) => {
                    field.onChange(singleValue?.value ?? null);
                  }}
                  options={yearsToOptions}
                />
              );
            }}
          />
          {watchedLanguages.length > 1 && (
            <button
              type="button"
              onClick={onRemove}
              className="btn border text-danger text-sm border-danger font-normal hover:bg-danger hover:text-white flex-1 grid justify-center"
            >
              Remove Tool/Language
            </button>
          )}
        </div>
        <ul className="mt-1">
          {[tlErrMsg, fromErrMsg, toErrMsg].filter(Boolean).map((err) => (
            <li key={err} className="text-sm font-medium text-danger">
              {err}
            </li>
          ))}
        </ul>
      </div>

      <Form.Group name={`${name}.description`}>
        <Form.Label>Description</Form.Label>
        <Form.Textarea rows={5} placeholder="Enter description ..." />
      </Form.Group>

      <Form.Group
        name={`${name}.images`}
        className="flex flex-row flex-wrap gap-4"
      >
        <div className="relative">
          {uploading && (
            <p className="z-10 absolute inset-0 grid place-items-center backdrop-blur-sm rounded-md text-sm text-primary font-bold">
              uploading...
            </p>
          )}
          <FilePicker
            className="h-[100px] w-[100px]"
            onDropFile={handleUploadFile}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              handleUploadFile(e.target.files);
            }}
          />
        </div>

        <ul className="flex gap-2 overflow-x-auto flex-1">
          {getValues(`${name}.images`)?.map(({ cdnUrl, id }, idx) => (
            <div
              className="flex gap-2 flex-shrink-0 items-center relative"
              key={id}
            >
              <button
                className="text-sm absolute right-2 top-1 rounded-full bg-neutral-100 p-1 opacity-80 hover:bg-danger hover:text-white"
                onClick={() => handleRemoveImage(idx)}
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
              <div className="w-[150px] h-[100px] object-cover rounded-md block">
                <img
                  className="w-full h-full object-cover rounded-md block"
                  src={cdnUrl}
                  alt={`port-${idx}`}
                />
              </div>
            </div>
          ))}
        </ul>
      </Form.Group>
      <div className="border border-gray-300 w-full border-dashed" />
    </div>
  );

  async function handleUploadFile(files: FileList | null) {
    if (files?.length) {
      try {
        setUploading(true);
        const file = files[0];
        const base64 = await fileToBase64(file);
        const images = getValues(`${name}.images`) ?? [];
        setValue(`${name}.images`, [
          ...images,
          { id: new Date().getTime(), cdnUrl: base64, displayOrder: 0 },
        ]);
      } catch (error) {
      } finally {
        setUploading(false);
      }
    }
  }

  function handleRemoveImage(idx: number) {
    const images = getValues(`${name}.images`) ?? [];
    setValue(
      `${name}.images`,
      images.filter((_, i: number) => i !== idx)
    );
  }
};

export default FormLanguage;
