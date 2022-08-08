import Seo from "../components/Seo";
import SwitchesGroup from "../components/SearchingSetting";
import FormHelperText from "@mui/material/FormHelperText";
import NationSettings from "../components/NationSettings";
import MultiMoviesSettings from "../components/MultiMoviesSettings";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";

export default function Setting() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <div className="container">
        <Seo title="Settings" />
        <div className="settings">
          <SwitchesGroup />
          <NationSettings />
          <MultiMoviesSettings />
          <FormHelperText onClick={handleClickOpen}>기본값 보기</FormHelperText>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">{"기본값 보기"}</DialogTitle>
            <DialogContent>
              <DialogContentText
                id="alert-dialog-description"
                textAlign="center"
              >
                {
                  "일/주간 박스오피스: False, 박스오피스 선택: 전체, 다양성/상업성 영화: 전체"
                }
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                Close
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </div>
      <style jsx>{`
        .container {
          display: flex;
          flex-flow: row wrap;
          justify-content: center;
          align-items: center;
        }
        .settings {
          display: flex;
          flex-flow: column wrap;
          padding: 40px;
          gap: 20px;
        }
      `}</style>
    </div>
  );
}
