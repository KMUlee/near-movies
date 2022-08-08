import * as React from "react";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
// redux
import { useSelector, useDispatch } from "react-redux";
import {
  dailyBoxOffice,
  weeklyBoxOffice,
} from "../store/modules/BoxOfficeSettings";
import Cookies from "js-cookie";

export default function SwitchesGroup() {
  const dispatch = useDispatch();

  let { boxOffice } = useSelector((state) => state.BoxOffice);
  boxOffice =
    Cookies.get("boxOffice") !== undefined
      ? JSON.parse(Cookies.get("boxOffice"))
      : boxOffice;
  const handleChange = () => {
    if (boxOffice == true) {
      dispatch(dailyBoxOffice());
      Cookies.set("boxOffice", "false");
    } else {
      dispatch(weeklyBoxOffice());
      Cookies.set("boxOffice", "true");
    }
  };

  return (
    <FormControl component="fieldset" variant="standard">
      <FormLabel component="legend">일/주간 박스오피스</FormLabel>
      <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={boxOffice}
              onChange={handleChange}
              name="boxOffice"
            />
          }
          label="주간 박스오피스"
        />
      </FormGroup>
    </FormControl>
  );
}
