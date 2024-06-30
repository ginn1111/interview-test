'use client';

import cx from '@/utils/cx';
import get from 'lodash/get';
import {
  createContext,
  FormHTMLAttributes,
  HTMLAttributes,
  InputHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
  TextareaHTMLAttributes,
  useContext,
} from 'react';
import {
  FieldValues,
  FormProvider as RHForm,
  useFormContext,
  UseFormReturn,
} from 'react-hook-form';
import { Input } from './input';
import { TextArea } from './textarea';

type FormProps<T extends object = FieldValues> = UseFormReturn<T> & {
  children?: ReactNode;
} & FormHTMLAttributes<HTMLFormElement>;

const FormContext = createContext<{ name: string; isError: boolean }>({
  name: '',
  isError: false,
});

type FormProviderProps = {
  name: string;
  isError: boolean;
  children: ReactNode;
};

const FormProvider = (props: FormProviderProps) => {
  const { children, ...value } = props;

  return <FormContext.Provider value={value}>{children}</FormContext.Provider>;
};

const Form = <T extends object = FieldValues>(props: FormProps<T>) => {
  const { children, id, onSubmit, className, ...formProps } = props;
  return (
    <RHForm {...formProps}>
      <form onSubmit={onSubmit} className={className} id={id}>
        {children}
      </form>
    </RHForm>
  );
};

type FormControlProps = InputHTMLAttributes<HTMLInputElement>;
const FormControl = (props: FormControlProps) => {
  const { name, isError } = useContext(FormContext);
  const { register } = useFormContext();

  return (
    <Input
      isError={isError}
      {...props}
      {...register(name)}
      className={cx({
        'focus-visible:ring-transparent transition duration-300 group-hover/input:shadow-[0_0_0_2px] shadow-[0_0_0_2px] shadow-danger text-danger':
          isError,
      })}
    />
  );
};

type FormTextareProps = TextareaHTMLAttributes<HTMLTextAreaElement>;
const FormTextarea = (props: FormTextareProps) => {
  const { name, isError } = useContext(FormContext);
  const { register } = useFormContext();

  return (
    <TextArea
      isError={isError}
      {...props}
      {...register(name)}
      className={cx({
        'focus-visible:ring-transparent transition duration-300 group-hover/input:shadow-[0_0_0_2px] shadow-[0_0_0_2px] shadow-danger text-danger':
          isError,
      })}
    />
  );
};

type FormLabelProps = LabelHTMLAttributes<HTMLLabelElement> & {
  children: ReactNode;
  isRequired?: boolean;
};
const FormLabel = ({
  isRequired,
  children,
  className,
  ...props
}: FormLabelProps) => {
  const { isError, name } = useContext(FormContext);

  return (
    <label
      {...props}
      htmlFor={name}
      className={cx(
        'font-semibold text-sm',
        {
          'text-danger': isError,
        },
        className
      )}
    >
      {children}
      {isRequired && <span className="font-bold text-danger">*</span>}
    </label>
  );
};

type FormGroupProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  name: string;
};

const FormGroup = ({ name, children, className, ...props }: FormGroupProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const isError = !!get(errors, name)?.message;

  return (
    <FormProvider name={name} isError={isError}>
      <div {...props} className={cx('flex flex-col', className)}>
        {children}
      </div>
    </FormProvider>
  );
};

const FormMessage = () => {
  const { name } = useContext(FormContext);
  const {
    formState: { errors },
  } = useFormContext();

  const errorMsg = get(errors, name)?.message;

  if (!errorMsg) return null;

  return (
    <p className="font-medium text-sm text-danger">{errorMsg as ReactNode}</p>
  );
};

Form.Control = FormControl;
Form.Label = FormLabel;
Form.Group = FormGroup;
Form.Message = FormMessage;
Form.Textarea = FormTextarea;

export { FormContext as FormStatusContext };
export default Form;
