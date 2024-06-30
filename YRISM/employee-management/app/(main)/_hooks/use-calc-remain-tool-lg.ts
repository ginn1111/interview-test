import { useMemo } from 'react';

type UseCalcRemainToolLg = {
  originalToolLg: ToolLanguageResource[];
  selectedToolLg: Partial<ToolLanguage>[];
};

const useCalcRemainToolLg = (props: UseCalcRemainToolLg) => {
  const { originalToolLg: original, selectedToolLg: selected } = props;

  const selectedToolLgIdx = selected.reduce(
    (acc, p) => {
      if (p.toolLanguageResourceId != null) {
        acc[p.toolLanguageResourceId] = true;
      }

      return acc;
    },
    {} as Record<number, true>
  );

  const remainToolLanguages = useMemo(() => {
    return original.filter((o) => !selectedToolLgIdx[o.toolLanguageResourceId]);
  }, [original, selectedToolLgIdx]);

  return remainToolLanguages;
};

export default useCalcRemainToolLg;
