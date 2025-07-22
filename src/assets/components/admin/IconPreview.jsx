import * as icons from "@mui/icons-material";

const LazyIcon = ({ iconName, ...props }) => {
  const IconComponent = icons[iconName];

  if (!IconComponent) {
    console.warn(`Icon "${iconName}" not found in @mui/icons-material`);
    return null; // 또는 <DefaultIcon />
  }

  return <IconComponent {...props} />;
};

export default LazyIcon;
