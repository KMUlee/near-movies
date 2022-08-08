import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useSelector, useDispatch } from "react-redux";
import { nationBoxOffice } from "../store/modules/BoxOfficeSettings";
import Cookies from "js-cookie";

export default function NationSettings() {
  let { nation } = useSelector((state) => state.BoxOffice);

  nation = Cookies.get("nation") !== undefined ? Cookies.get("nation") : nation;

  const dispatch = useDispatch();

  const handleChange = (event) => {
    dispatch(nationBoxOffice(event.target.value));
    Cookies.set("nation", event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="demo-controlled-radio-buttons-group">
        박스오피스 선택
      </FormLabel>
      <RadioGroup
        aria-labelledby="demo-controlled-radio-buttons-group"
        name="controlled-radio-buttons-group"
        value={nation}
        onChange={handleChange}
      >
        <FormControlLabel value="entire" control={<Radio />} label="전체" />
        <FormControlLabel value="korea" control={<Radio />} label="한국" />
        <FormControlLabel value="foreign" control={<Radio />} label="외국" />
      </RadioGroup>
    </FormControl>
  );
}
