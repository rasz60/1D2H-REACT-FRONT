import {
  mdiAlphaA,
  mdiAlphaB,
  mdiAlphaC,
  mdiAlphaD,
  mdiAlphaE,
  mdiAlphaF,
  mdiAlphaG,
  mdiAlphaH,
  mdiAlphaI,
  mdiAlphaJ,
  mdiAlphaK,
  mdiAlphaL,
  mdiAlphaM,
  mdiAlphaN,
  mdiAlphaO,
  mdiAlphaP,
  mdiAlphaQ,
  mdiAlphaR,
  mdiAlphaS,
  mdiAlphaT,
  mdiAlphaU,
  mdiAlphaV,
  mdiAlphaW,
  mdiAlphaX,
  mdiAlphaY,
  mdiAlphaZ,
} from "@mdi/js";
import {
  PersonSearch,
  LogoDev,
  PsychologyAltOutlined,
  GitHub,
  SendOutlined,
} from "@mui/icons-material";

const iconMap = {
  a: mdiAlphaA,
  b: mdiAlphaB,
  c: mdiAlphaC,
  d: mdiAlphaD,
  e: mdiAlphaE,
  f: mdiAlphaF,
  g: mdiAlphaG,
  h: mdiAlphaH,
  i: mdiAlphaI,
  j: mdiAlphaJ,
  k: mdiAlphaK,
  l: mdiAlphaL,
  m: mdiAlphaM,
  n: mdiAlphaN,
  o: mdiAlphaO,
  p: mdiAlphaP,
  q: mdiAlphaQ,
  r: mdiAlphaR,
  s: mdiAlphaS,
  t: mdiAlphaT,
  u: mdiAlphaU,
  v: mdiAlphaV,
  w: mdiAlphaW,
  x: mdiAlphaX,
  y: mdiAlphaY,
  z: mdiAlphaZ,
  PersonSearch: <PersonSearch />,
  LogoDev: <LogoDev />,
  PsychologyAltOutlined: <PsychologyAltOutlined />,
  GitHub: <GitHub />,
  SendOutlined: <SendOutlined />,
};

const getMdiIcon = (param) => {
  return iconMap[param?.toLowerCase?.()];
};

const getMuiIcon = (param) => {
  return iconMap[param];
};

export default () => ({
  getMdiIcon,
  getMuiIcon,
});
