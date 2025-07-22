/* @mui/icons-material 전체 이름 JSON 추출 */
const fs = require("fs");
const path = require("path");

const ICON_DIR = path.join(__dirname, "./node_modules/@mui/icons-material");

const isIconFile = (file) => file.endsWith(".js") && file !== "index.js";
const extractIconName = (file) => path.basename(file, ".js");

const OUTPUT_PATH = path.join(__dirname, "./src/assets/mui_icon_list.json");

const generateIconList = () => {
  const files = fs.readdirSync(ICON_DIR);
  const iconNames = files.filter(isIconFile).map(extractIconName).sort();

  const formatList = iconNames.map((name) => ({
    label: name,
    value: name,
  }));

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(formatList, null, 2), "utf-8");
};

generateIconList();
