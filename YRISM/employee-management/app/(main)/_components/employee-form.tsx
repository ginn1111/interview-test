'use client';

import { clearCache } from '@/app/server-actions/clear-cache';
import Loading from '@/components/loading';
import Form from '@/components/ui/form';
import {
  addNewEmployee,
  deleteEmployee,
  updateEmployee,
} from '@/lib/api/server';
import { getRandomId } from '@/utils/random-id';
import { zodResolver } from '@hookform/resolvers/zod';
import { pick } from 'lodash';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import z from 'zod';
import useCalcRemainPosition from '../_hooks/use-calc-remain-position';
import FormPosition from './form-position';

const ToolLanguagesSchema = z.object({
  toolLanguageResourceId: z.number({
    required_error: 'Choose a tool/language please',
    invalid_type_error: 'Choose a tool/language please',
  }),
  from: z.number({
    required_error: 'Choose a from year please',
    invalid_type_error: 'Choose a from year please',
  }),
  to: z.number({
    required_error: 'Choose a to year please',
    invalid_type_error: 'Choose a to year please',
  }),
  description: z.string().nullish(),
});

const PositionSchema = z.object({
  positionResourceId: z.number({ required_error: 'Choose a position please' }),
  toolLanguages: z.array(ToolLanguagesSchema),
});

const EmployeeSchema = z.object({
  name: z.string().min(1, 'Enter employee name please'),
  positions: z.array(PositionSchema),
});

type EmployeeFormProps = {
  positionResources: PositionResource[];
  employee?: EmployeeProfile;
};

type FormEmployee = {
  name: string;
  positions: Partial<Position>[];
};

const EmployeeForm = (props: EmployeeFormProps) => {
  const { positionResources, employee } = props;
  const router = useRouter();

  const isEdit = employee;

  const form = useForm<FormEmployee>({
    mode: 'onSubmit',
    shouldFocusError: false,
    resolver: zodResolver(EmployeeSchema),
    defaultValues: employee ?? {
      name: '',
      positions: [{}],
    },
  });

  const posIdx: Record<number, any> = useMemo(() => {
    return positionResources.reduce((pos, p) => {
      const toolLg = p.toolLanguageResources.reduce(
        (tl, t) => ({
          ...tl,
          [t.toolLanguageResourceId]: {
            positionReourceId: p.positionResourceId,
            toolLanguageResourceId: t.toolLanguageResourceId,
          },
        }),
        {}
      );

      return {
        ...pos,
        [p.positionResourceId]: {
          name: p.name,
          positionResourceId: p.positionResourceId,
          toolLanguageIdx: toolLg,
        },
      };
    }, {});
  }, [positionResources]);

  const watchedPos = form.watch('positions');

  const remainPositions = useCalcRemainPosition({
    originalPositions: positionResources,
    selectedPositions: watchedPos ?? [],
  });

  return (
    <div className="flex w-full justify-center">
      <div className="w-full md:w-2/3 space-y-4">
        {form.formState.isSubmitting && <Loading />}
        <Form
          {...form}
          onSubmit={form.handleSubmit(isEdit ? handleUpdate : handleSubmit)}
          id="employee-form"
          className="space-y-4"
        >
          <Form.Group name="name">
            <Form.Label isRequired>Name</Form.Label>
            <Form.Control placeholder="Enter employee name ..." />
            <Form.Message />
          </Form.Group>
          {watchedPos?.map((_, idx) => (
            <FormPosition
              originalPos={positionResources}
              positions={remainPositions}
              name={`positions.${idx}`}
              onRemove={() => handleRemovePosition(idx)}
            />
          ))}
        </Form>

        {(watchedPos?.length ?? 0) < positionResources.length && (
          <button
            className="btn bg-primary text-text-primary text-sm"
            type="button"
            onClick={handleAddPosition}
          >
            Add position
          </button>
        )}
        <div className="flex mt-4 justify-between">
          {isEdit && (
            <button
              type="button"
              className="btn border text-danger text-sm border-danger font-normal hover:bg-danger hover:text-white"
              onClick={() => handleDeleteEmployee(employee.id)}
            >
              Delete
            </button>
          )}
          <div className="flex gap-2">
            {isEdit && (
              <button
                type="button"
                className="btn text-sm"
                onClick={() => {
                  router.push('/');
                  clearCache();
                }}
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              className="btn bg-primary text-text-primary text-sm"
              form="employee-form"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  async function handleDeleteEmployee(id: number) {
    try {
      const response = await deleteEmployee(id);
      if (response.data.statusCode === 200) {
        clearCache();
        router.push('/');
      }
    } catch {
      toast.error('Something went wrong');
    }
  }

  function handleAddPosition() {
    const positions = form.getValues('positions') ?? [];
    const newPositions: Partial<Position>[] = [...positions, {}];
    form.setValue('positions', newPositions);
  }

  function handleRemovePosition(idx: number) {
    const positions = form.getValues('positions') ?? [];
    const newPositions = positions.toSpliced(idx, 1);
    form.setValue('positions', newPositions);
  }

  function constructPosData(pos: Partial<Position>[]) {
    const constructSubmitPosData = pos.map((p, pI) => {
      if (typeof p.positionResourceId === 'number') {
        const pos = posIdx[p.positionResourceId];

        const constructTlLg = p.toolLanguages?.map((tl, tlI) => {
          return {
            ...pick(tl, ['description', 'from', 'to']),
            ...pos.toolLanguageIdx[tl.toolLanguageResourceId],
            displayOrder: tlI + 1,
            id: getRandomId(),
            images:
              tl.images?.map((img, imgI) => ({
                ...img,
                id: getRandomId(),
                displayOrder: imgI + 1,
              })) ?? [],
          };
        });

        return {
          id: getRandomId(),
          positionResourceId: pos.positionResourceId,
          toolLanguages: constructTlLg,
          displayOrder: pI + 1,
        };
      }

      return p;
    });

    return constructSubmitPosData as Position[];
  }

  async function handleUpdate() {
    const pos = form.getValues('positions');

    const constructSubmitPosData = constructPosData(pos);

    try {
      const response = await updateEmployee(employee!.id, {
        name: form.getValues('name'),
        positions: constructSubmitPosData,
      });
      if (response.data.statusCode === 200) {
        clearCache();
        router.push('/');
        toast.success('Employee updated successfully');
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  }

  async function handleSubmit() {
    const pos = form.getValues('positions');

    const constructSubmitPosData = constructPosData(pos);

    try {
      const response = await addNewEmployee({
        name: form.getValues('name'),
        positions: constructSubmitPosData,
      });
      if (response.data.statusCode === 200) {
        toast.success('Employee created successfully');
        clearCache();
        router.push('/');
      } else {
        toast.error('Something went wrong!');
      }
    } catch (error) {
      toast.error('Something went wrong!');
    }
  }
};

export default EmployeeForm;
