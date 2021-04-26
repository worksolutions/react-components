import React, { SyntheticEvent } from "react";
import { observer } from "mobx-react-lite";
import { preventDefaultAndStopPropagationHandler } from "@worksolutions/react-utils";
import { clamp, repeat } from "ramda";

import { ai, cursor, flex, marginLeft, marginRight, minWidth, padding, pointerEvents, textAlign } from "../../styles";
import Button, { ButtonSize, ButtonType } from "../../primitives/Button";
import { ghostActive } from "../../primitives/Button/styles/types/ghost";
import Wrapper from "../../primitives/Wrapper";
import { calculatePaginationParams, controlKeyIsPressed } from "./libs/libs";
import TypographyLink from "../../primitives/Typography/TypographyLink";
import Typography from "../../primitives/Typography";
import Form from "../../primitives/Form";
import MaskedInput, { makeMask } from "../../primitives/Input/MaskedInput";
import { InputContainerSize } from "../../primitives/InputContainer/enums";
import TextWidthDetector from "../../primitives/TextWidthDetector";
import { intl } from "../../intl";
import { calculatePagination } from "./libs";

export interface PaginationInterface {
  outerStyles?: any;
  buttonsListWrapperStyles?: any;
  showCurrentPageText?: boolean;
  currentPageTextStyles?: any;
  showGoToPage?: boolean;
  goToPageStyles?: any;
  totalElements: number;
  page: number;
  perPage: number;
  maxLinksCount?: number;
  showPageIfSingle?: boolean;
  onChange: (page: number) => void;
  getPageUrl: (page: number) => string;
}

const DEFAULT_MAX_LINKS_COUNT = 7;

const MIN_LINKS_COUNT = 3;

function Pagination({
  outerStyles,
  buttonsListWrapperStyles,
  page: currentPage,
  perPage,
  showCurrentPageText = true,
  currentPageTextStyles,
  showGoToPage = true,
  goToPageStyles,
  totalElements,
  maxLinksCount = DEFAULT_MAX_LINKS_COUNT, // Общее количество элементов в пагинаторе
  showPageIfSingle,
  onChange,
  getPageUrl,
}: PaginationInterface) {
  const [goToPage, setGoToPage] = React.useState("");
  const pages = React.useMemo(() => Math.ceil(totalElements / perPage), [perPage, totalElements]);

  const pagesArray = React.useMemo(() => {
    const pagination = calculatePagination(pages, currentPage, Math.max(maxLinksCount, MIN_LINKS_COUNT));
    if (pagination.length !== 1 || showPageIfSingle) return pagination;
    return [];
  }, [currentPage, maxLinksCount, pages, showPageIfSingle]);

  const handleChangeFabric = React.useCallback(
    (page: number) => (ev: SyntheticEvent<HTMLAnchorElement, MouseEvent>) => {
      const disabled = currentPage === page;
      if (disabled) {
        preventDefaultAndStopPropagationHandler(ev);
        return;
      }
      if (controlKeyIsPressed(ev)) return;
      preventDefaultAndStopPropagationHandler(ev);
      onChange(page);
    },
    [currentPage, onChange],
  );

  const mask = React.useMemo(() => makeMask(repeat(/\d/, pages.toString().length)), [pages]);

  const inputRef = React.useRef<HTMLInputElement>(null!);

  const handleSubmit = React.useCallback(() => {
    const newPage = goToPage ? clamp(1, pages, parseFloat(goToPage)) || 1 : "";
    if (newPage === "") return;
    onChange(newPage);
    setGoToPage("");
    inputRef.current!.blur();
  }, [goToPage, onChange, pages]);

  const { lastElementNumberOnPage, firstElementNumberOnPage } = React.useMemo(
    () => calculatePaginationParams(currentPage, perPage, totalElements),
    [currentPage, perPage, totalElements],
  );

  return (
    <Wrapper styles={[flex, ai("center"), outerStyles]}>
      {showCurrentPageText && (
        <Typography
          color="definitions.Pagination.infoTextColor"
          noWrap
          styles={[marginRight(16), currentPageTextStyles]}
        >
          {firstElementNumberOnPage}-{lastElementNumberOnPage} {intl.text("components.pagination.of")} {totalElements}
        </Typography>
      )}
      <Wrapper styles={[flex, buttonsListWrapperStyles]}>
        {pagesArray.map(({ text, page }) => (
          <TypographyLink key={page} to={getPageUrl(page)} onClick={handleChangeFabric(page)}>
            <Button
              styles={[
                padding("1px 8px"),
                minWidth(36),
                marginRight(2),
                marginLeft(2),
                page === currentPage && [ghostActive, cursor("default"), pointerEvents("none")],
              ]}
              size={ButtonSize.SMALL}
              type={ButtonType.GHOST}
              preventDefault={false}
            >
              {text}
            </Button>
          </TypographyLink>
        ))}
      </Wrapper>
      {showGoToPage && (
        <Wrapper styles={[flex, ai("center"), marginLeft(16), goToPageStyles]}>
          <Typography color="definitions.Pagination.infoTextColor" noWrap>
            {intl.text("components.pagination.goToPage")}:
          </Typography>
          <Form onSubmit={handleSubmit}>
            <MaskedInput
              ref={inputRef}
              size={InputContainerSize.MEDIUM}
              mask={mask}
              outerStyles={marginLeft(8)}
              styles={textAlign("center")}
              value={goToPage}
              placeholder="1"
              debounce={0}
              onChange={setGoToPage}
            />
          </Form>
          <TextWidthDetector extraHorizontalPadding={14} text={goToPage || "0"} ref={inputRef} />
        </Wrapper>
      )}
    </Wrapper>
  );
}

const ObservedComponent = observer(Pagination);

// @ts-ignore
ObservedComponent.baseElement = Pagination;

export default ObservedComponent;
