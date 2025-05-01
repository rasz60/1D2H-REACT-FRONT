import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  TextField,
} from "@mui/material";
import axiosInstance from "@src/utils/axiosInstance";
import { useEffect, useState } from "react";

const DevLogLangAddPopup = ({ toggleLang, setToggleLang, setLangDialog }) => {
  const [languages, setLanguages] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    console.log("💡 setLangDialog type:", typeof setLangDialog);
    getLanguages();
  }, []);

  const getLanguages = async () => {
    await axiosInstance
      .get("/dlog/langList")
      .then((res) => {
        setLanguages(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleClosePopup = () => {
    setToggleLang(false);
  };

  const handleLangs = (value) => {
    setSelected(languages.filter((language) => language.langName === value)[0]);
  };

  const handleSelected = () => {
    if (selected != null) {
      setLangDialog(selected);
    } else {
      setToggleLang(false);
    }
  };

  return (
    <Dialog open={toggleLang} onClose={handleClosePopup}>
      <DialogContent>
        <Autocomplete
          options={languages.map((lang) => lang.langName)}
          sx={{ width: "10em" }}
          renderInput={(params) => <TextField {...params} variant="standard" />}
          onChange={(event, value) => handleLangs(value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSelected} autoFocus>
          추가
        </Button>
        <Button onClick={handleClosePopup} color="error">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DevLogLangAddPopup;
