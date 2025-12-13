import { Button } from "@mui/material";
import { ReactElement } from "react";

type ActionButton = {
  children: ReactElement;
};

export const ActionButton = ({ children }: ActionButton) => {
  return (
    <Button
      variant="contained"
      color="primary"
      sx={{ padding: 0, minWidth: "36px", minHeight: "36px" }}
    >
      {children}
    </Button>
  );
};
