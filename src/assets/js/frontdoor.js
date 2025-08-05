import Icon from "@mdi/react";
import getIcon from "@js/menuIcon.js";
import { Chip } from "@mui/material";

const { getMdiIcon } = getIcon();

const calculateDiffDate = (start, end) => {
  let dateStr = "";
  let sDate = new Date(start);
  let eDate = null;

  if (end === null || end === "") {
    eDate = new Date();
  } else {
    eDate = new Date(end);
  }

  let diff = eDate.getTime() - sDate.getTime();

  let year = 365 * 24 * 60 * 60 * 1000;
  let month = 30 * 24 * 60 * 60 * 1000;

  let y = parseInt(diff / year);
  let m = Math.ceil((diff - y * year) / month);

  if (y > 0) {
    dateStr += y + "년";
  }

  if (m > 0) {
    dateStr += (y > 0 ? " " : "") + m + "개월";
  }

  return dateStr;
};

const generateIconText = (keyword, size) => {
  return keyword
    .split("")
    .map((char, idx) => (
      <Icon
        path={getMdiIcon(char)}
        size={size}
        color="primary"
        key={"Char_" + idx}
      />
    ));
};

const generateSkillChip = (name) => {
  return <Chip size="small" label={name} variant="outlined"></Chip>;
};

export default () => ({
  calculateDiffDate,
  generateIconText,
  generateSkillChip,
});
