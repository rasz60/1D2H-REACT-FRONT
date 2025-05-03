import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid,
  Grid2,
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
    <Dialog open={toggleLang} onClose={handleClosePopup} id="add-popup">
      <DialogContent>
        <FormControl fullWidth className="add-form-control">
          <Grid2 container>
            <Grid2 size={2} className="add-form-label">
              사용 언어
            </Grid2>
            <Grid2 size={10}>
              <Autocomplete
                options={languages.map((lang) => lang.langName)}
                renderInput={(params) => (
                  <TextField {...params} variant="standard" />
                )}
                onChange={(event, value) => handleLangs(value)}
              />
            </Grid2>
          </Grid2>
        </FormControl>
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
