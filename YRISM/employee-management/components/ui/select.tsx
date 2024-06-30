import cx from '@/utils/cx';
import ReactSelect, { GroupBase, Props } from 'react-select';

type SelectProps<
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Props<Option, IsMulti, Group>;

const Select = <
  Option,
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>(
  props: SelectProps<Option, IsMulti, Group>
) => {
  const { className, ...restProps } = props;
  return (
    <ReactSelect {...restProps} className={cx('custom-select', className)} />
  );
};

export default Select;
