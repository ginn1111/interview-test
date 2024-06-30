import { useMemo } from 'react';

type UseCalcRemainPosition = {
  originalPositions: PositionResource[];
  selectedPositions: Partial<Position>[];
};

const useCalcRemainPosition = (props: UseCalcRemainPosition) => {
  const { originalPositions: original, selectedPositions: selected } = props;

  const selectedPosIdx = selected.reduce(
    (acc, p) => {
      if (p.positionResourceId != null) {
        acc[p.positionResourceId] = true;
      }

      return acc;
    },
    {} as Record<number, true>
  );

  const remainPositions = useMemo(() => {
    return original.filter((o) => !selectedPosIdx[o.positionResourceId]);
  }, [original, selectedPosIdx]);

  return remainPositions;
};

export default useCalcRemainPosition;
