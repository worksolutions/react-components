import React from "react";
import { observer } from "mobx-react-lite";
import { css } from "styled-components";
import { useMemoizeCallback, useProvideRef } from "@worksolutions/react-utils";
import { htmlCollectionToArray, isArray } from "@worksolutions/utils";
import { identity } from "ramda";

import Wrapper from "../../primitives/Wrapper";

import { CellSize, defaultTableContext, tableContext, TableContextInterface } from "./TableContext";
import { maxWidth, nthChild, position, width } from "../../styles";
import TableResizer from "./internal/Resizer";

export interface TableInterface extends Partial<TableContextInterface> {
  outerStyles?: any;
  tableStyles?: any;
  resizable?: boolean | number[];
  children: React.ReactNode;
  onResize?: (sizes: number[]) => void;
}

const cssStyles = css`
  border-spacing: 0;
`;

function makeWidthStyle(size: CellSize, index: number) {
  return nthChild(`${index + 1}`, [width(size), maxWidth(size)], "tr td");
}

function Table(
  { outerStyles, tableStyles, children, resizable, onResize, ...config }: TableInterface,
  ref: React.Ref<HTMLTableElement>,
) {
  const tableRef = React.useRef<HTMLTableElement>(null!);

  const [cellLeftsInPixels, setCellLeftsInPixels] = React.useState<number[]>(null!);

  const resultConfig = React.useMemo(
    () => (config ? Object.assign({}, defaultTableContext, config) : defaultTableContext),
    [config],
  );

  React.useEffect(() => {
    const resizeObserver = new ResizeObserver(function () {
      const headerCells = htmlCollectionToArray(tableRef.current.querySelector("thead tr")!.children);
      setCellLeftsInPixels(calculateLeftsFromSizes(headerCells.map((cell) => cell.getBoundingClientRect().width)));
    });
    resizeObserver.observe(tableRef.current);

    return () => resizeObserver.disconnect();
  }, [resultConfig.cellSizes]);

  const sizesStyle = React.useMemo(() => {
    if (resultConfig.cellSizes === "auto") return null;
    return resultConfig.cellSizes.map(makeWidthStyle);
  }, [resultConfig.cellSizes]);

  const handleResize = React.useCallback(
    (lefts: number[]) => {
      if (!onResize) return;
      onResize(calculateSizesFromLefts(lefts));
    },
    [onResize],
  );

  const getCanResize = useMemoizeCallback(
    identity,
    (columnIndex: number) => {
      if (isArray(resizable)) return resizable.includes(columnIndex);
      return !!resizable;
    },
    [resizable],
  );

  return (
    <tableContext.Provider value={resultConfig}>
      <Wrapper styles={[position("relative"), outerStyles]}>
        <Wrapper as="table" ref={useProvideRef(ref, tableRef)} styles={[cssStyles, sizesStyle, tableStyles]}>
          {children}
        </Wrapper>
        {resizable && cellLeftsInPixels && (
          <TableResizer
            cellLeftsInPixels={cellLeftsInPixels}
            setCellLeftsInPixels={handleResize}
            getCanResize={getCanResize}
          />
        )}
      </Wrapper>
    </tableContext.Provider>
  );
}

export default React.memo(observer(Table, { forwardRef: true }));

function calculateLeftsFromSizes(headerCellSizes: null | number[]) {
  if (!headerCellSizes) return [];

  const resultLefts: number[] = [];
  let sum = 0;

  for (let i = 0; i < headerCellSizes.length; i++) {
    const cellSize = headerCellSizes[i];
    const left = cellSize + sum;
    resultLefts.push(left);
    sum = left;
  }

  return resultLefts;
}

function calculateSizesFromLefts(lefts: number[]) {
  const resultSizes: number[] = [];
  let sum = 0;

  for (let i = 0; i < lefts.length; i++) {
    const cellLeft = lefts[i];
    const size = cellLeft - sum;
    resultSizes.push(size);
    sum += size;
  }

  return resultSizes;
}
