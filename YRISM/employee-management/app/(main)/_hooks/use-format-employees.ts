import { useMemo } from 'react';

type UseFormatemployees = {
  positions: PositionResource[];
  employees: EmployeeProfile[];
};

const useFormatEmployees = ({ employees, positions }: UseFormatemployees) => {
  const positionIdx = useMemo<Record<number, string>>(() => {
    return positions.reduce(
      (acc, p) => ({ ...acc, [p.positionResourceId]: p.name.trim() }),
      {}
    );
  }, [positions]);

  const fmtEmployees = useMemo(() => {
    return employees.map((e) => {
      const positionNames = e.positions
        .map((p) => positionIdx[p.positionResourceId])
        .filter(Boolean);

      const images = e.positions
        .flatMap(
          (p) =>
            p.toolLanguages.flatMap((tl) =>
              tl.images?.map((img) => img.cdnUrl)
            ) ?? []
        )
        .filter(Boolean);

      const exps = e.positions.reduce(
        (exp, p) =>
          exp +
          p.toolLanguages.reduce(
            (expEachTl, tl) => expEachTl + (tl.to - tl.from),
            0
          ),
        0
      );

      let description = '';

      for (const position of e.positions) {
        if (description) break;
        for (const tl of position.toolLanguages) {
          if (tl.description) {
            description = tl.description;
            break;
          }
        }
      }

      return {
        id: e.id,
        name: e.name,
        positionNames,
        images,
        exps,
        description,
      };
    });
  }, [employees, positionIdx]);

  return fmtEmployees;
};

export default useFormatEmployees;
