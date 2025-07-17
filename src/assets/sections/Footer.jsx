import { GitHub, Mail } from "@mui/icons-material";
import { Divider, Grid2, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();

  const handleMove = (target) => {
    if (target === "github") {
      window.open("https://github.com/rasz60", "_blank");
    } else {
      navigate(target);
    }
  };

  return (
    <footer>
      <Divider></Divider>

      <p>ヾ(⌐■_■)ノ♪</p>

      <Grid2 container>
        <Grid2 size={4}></Grid2>
        <Grid2
          container
          size={4}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <IconButton
            sx={{ margin: "0.2em" }}
            onClick={() => handleMove("github")}
          >
            <GitHub />
          </IconButton>

          <IconButton
            sx={{ margin: "0.2em" }}
            onClick={() => handleMove("/sendmail")}
          >
            <Mail />
          </IconButton>
        </Grid2>
        <Grid2 size={4}></Grid2>
      </Grid2>

      <p>
        <img
          src="https://cdnjs.cloudflare.com/ajax/libs/flag-icon-css/6.6.6/flags/4x3/kr.svg"
          alt="Korean flag"
          style={{ width: "1.2em", verticalAlign: "middle" }}
        />
        &nbsp; devsixt. SINCE 2022
      </p>
    </footer>
  );
};

export default Footer;
