import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSelector, useDispatch } from "react-redux";
import { multiBoxOffice } from "../store/modules/BoxOfficeSettings";
import Cookies from "js-cookie";

export default function MultiMoviesSettings() {
  let { multi } = useSelector((state) => state.BoxOffice);

  multi = Cookies.get("multi") !== undefined ? Cookies.get("multi") : multi;

  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(multiBoxOffice(event.target.value));
    Cookies.set("multi", event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">
        다양성/상업성 영화
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={multi}
        onChange={handleChange}
      >
        <FormControlLabel value="entire" control={<Radio />} label="전체" />
        <FormControlLabel value="Y" control={<Radio />} label="다양성" />
        <FormControlLabel value="N" control={<Radio />} label="상업성" />
      </RadioGroup>
    </FormControl>
  );
}
