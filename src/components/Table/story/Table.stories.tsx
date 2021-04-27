import React from "react";
import { Story } from "@storybook/react/types-6-0";

import TableComponent from "../Table";
import TableHead, { TableHeadTypography } from "../TableHead";
import TableRow from "../TableRow";
import TableCell from "../TableCell";
import TableBody from "../TableBody";
import Typography from "../../../primitives/Typography";
import Toggle from "../../../primitives/Toggle";
import Wrapper from "../../../primitives/Wrapper";
import { flex, flexColumn, marginTop } from "../../../styles";

export default {
  title: "Table",
  argTypes: {},
};

const TableTemplate: Story<any> = () => {
  const [autoCellSizes, setAutoCellSizes] = React.useState(false);
  const [cellSizes, setCellSizes] = React.useState<any>([450, 150, 150, "auto"]);

  return (
    <Wrapper styles={[flex, flexColumn]}>
      <TableComponent cellSizes={autoCellSizes ? "auto" : cellSizes} resizable onResize={setCellSizes}>
        <TableHead>
          <TableRow>
            <TableCell>
              <TableHeadTypography>Название</TableHeadTypography>
            </TableCell>
            <TableCell>
              <TableHeadTypography>Дата</TableHeadTypography>
            </TableCell>
            <TableCell>
              <TableHeadTypography>Статус</TableHeadTypography>
            </TableCell>
            <TableCell>
              <TableHeadTypography>Тест</TableHeadTypography>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>
              <Typography>Нейродайджест: главное из области машинного обучения за март 2021</Typography>
            </TableCell>
            <TableCell>
              <Typography>05 апреля 2021</Typography>
            </TableCell>
            <TableCell>
              <Typography>Опубликовано</Typography>
            </TableCell>
            <TableCell>
              <Typography>1</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography>Как мы обучили нейросеть поздравлять женщин с 8 марта</Typography>
            </TableCell>
            <TableCell>
              <Typography>15 марта 2021</Typography>
            </TableCell>
            <TableCell>
              <Typography>Опубликовано</Typography>
            </TableCell>
            <TableCell>
              <Typography>2</Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Typography dots>
                Зачем нужна Headless CMS: рассказываем на примере внедрения Strapi на проекте CarPrice
              </Typography>
            </TableCell>
            <TableCell>
              <Typography>19 февраля 2021</Typography>
            </TableCell>
            <TableCell>
              <Typography>Не опубликовано</Typography>
            </TableCell>
            <TableCell>
              <Typography>3</Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </TableComponent>
      <Toggle styles={marginTop(16)} text="Авторазмеры" enabled={autoCellSizes} onChange={setAutoCellSizes} />
    </Wrapper>
  );
};

export const Table = TableTemplate.bind({});

Table.args = {};
