import React from "react";

import Typography from "../../Typography";

interface TitleInterface {
  title?: string | number;
  styles?: any;
}

function Title({ title, styles }: TitleInterface) {
  if (!title) return null;
  return (
    <Typography styles={styles} color="gray-blue/05" noWrap>
      {title}
    </Typography>
  );
}
export default React.memo(Title);
