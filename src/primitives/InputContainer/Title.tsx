import Typography from "../Typography";
import React from "react";

function Title({ title, styles }: { title?: string | number; styles?: any }) {
  if (!title) return null;
  return (
    <Typography styles={styles} color="gray-blue/05" noWrap>
      {title}
    </Typography>
  );
}
export default React.memo(Title);
