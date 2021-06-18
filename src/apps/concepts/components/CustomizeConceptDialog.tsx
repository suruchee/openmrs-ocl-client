import React from "react";
import {
  Button,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogTitle,
} from "@material-ui/core";
import { Link } from "react-router-dom";

interface Props {
  open: boolean;
  handleClose: () => void;
  url: string;
}

const CustomizeConceptDialog: React.FC<Props> = ({
  open,
  handleClose,
  url,
}) => {
  return (
    <Dialog open={open}>
      <DialogTitle>
        This is a curated concept from: <b>CIEL</b>. Do you want to customize
        this concept?
        <br />
        <br />
        Note: This means the concept cannot be automatically updated with future CIEL version changes; however, the ID number will stay the same.
      </DialogTitle>
      <DialogActions>
        <ButtonGroup fullWidth color="primary" variant="text" size="medium">
          <Button onClick={handleClose}>Cancel</Button>
          <Button to={url} component={Link}>
            CUSTOMIZE
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Dialog>
  );
};

export default CustomizeConceptDialog;
