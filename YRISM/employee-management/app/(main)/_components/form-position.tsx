import Form from '@/components/ui/form';
import Select from '@/components/ui/select';
import cx from '@/utils/cx';
import { useMemo } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import FormLanguage from './form-language';

type FormPositionProps = {
  onRemove: () => void;
  name: string;
  positions: PositionResource[];
  originalPos: PositionResource[];
};

const FormPosition = (props: FormPositionProps) => {
  const { onRemove, originalPos, name, positions } = props;
  const form = useFormContext();
  const toolLanguagesName = `${name}.toolLanguages`;

  const originalPosOptions = useMemo(
    () =>
      originalPos.map(({ positionResourceId, name }) => ({
        value: positionResourceId,
        label: name,
      })),
    [originalPos]
  );

  const posOptions = useMemo(
    () =>
      positions.map(({ positionResourceId, name }) => ({
        value: positionResourceId,
        label: name,
      })),
    [positions]
  );

  const watchedPosition = useWatch({
    name: 'positions',
  });

  const watchedSelectedPos = useWatch({
    name: `${name}.positionResourceId`,
  });

  const watchedLanguages = useWatch({
    name: toolLanguagesName,
  }) as ToolLanguage[];

  const toolLanguageOfPos = useMemo(() => {
    const posSelected = originalPos.find(
      (p) => p.positionResourceId === watchedSelectedPos
    );

    if (posSelected == null) return [];

    return posSelected.toolLanguageResources;
  }, [positions, originalPos, watchedSelectedPos]);

  return (
    <div>
      <div>
        <Form.Group name={`${name}.positionResourceId`} className="flex-1 mb-4">
          <Form.Label isRequired>Position</Form.Label>
          <div className="flex gap-2 items-center">
            <div className="flex-1">
              <Controller
                name={`${name}.positionResourceId`}
                render={({ field, fieldState: { error } }) => {
                  return (
                    <Select
                      {...field}
                      placeholder="Choose a position..."
                      className={cx('custom-select', error?.message, {
                        error: error?.message,
                      })}
                      value={
                        originalPosOptions.find(
                          (item) => item.value === field.value
                        ) ?? null
                      }
                      onChange={(singleValue) => {
                        form.setValue(toolLanguagesName, [
                          {
                            toolLanguageResourceId: null,
                            from: null,
                            to: null,
                          },
                        ]);
                        field.onChange(singleValue?.value ?? null);
                      }}
                      options={posOptions}
                    />
                  );
                }}
              />
            </div>
            {watchedPosition.length > 1 && (
              <button
                type="button"
                className="btn border text-danger text-sm border-danger font-normal hover:bg-danger hover:text-white"
                onClick={onRemove}
              >
                Delete Position
              </button>
            )}
          </div>
          <Form.Message />
        </Form.Group>
      </div>
      {watchedSelectedPos && watchedLanguages?.length > 0 && (
        <ul className="space-y-4">
          {watchedLanguages.map((_, idx) => (
            <FormLanguage
              name={`${toolLanguagesName}.${idx}`}
              langsName={toolLanguagesName}
              toolLanguages={toolLanguageOfPos}
              onRemove={() => handleRemoveLanguage(idx)}
            />
          ))}
        </ul>
      )}

      {toolLanguageOfPos.length > watchedLanguages?.length &&
        watchedSelectedPos != undefined && (
          <button
            onClick={handleAddLanguage}
            className="btn mt-4 text-sm"
            type="button"
          >
            Add Tool/Language
          </button>
        )}
    </div>
  );

  function handleAddLanguage() {
    const languages = form.getValues(toolLanguagesName) ?? [];
    const newLanguages = [...languages, {}];
    form.setValue(toolLanguagesName, newLanguages);
  }

  function handleRemoveLanguage(idx: number) {
    const languages = form.getValues(toolLanguagesName) ?? [];
    const newLanguages = languages.toSpliced(idx, 1);
    form.setValue(toolLanguagesName, newLanguages);
  }
};

export default FormPosition;
