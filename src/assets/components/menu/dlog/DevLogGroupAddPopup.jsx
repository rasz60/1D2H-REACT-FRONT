import {
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  Grid2,
  TextField,
} from "@mui/material";
import axiosInstance from "@src/utils/axiosInstance";
import { useEffect, useState } from "react";

const DevLogLangAddPopup = ({ togglePopup, setTogglePopup }) => {
  const [groupTitle, setGroupTitle] = useState(null);
  const [error, setError] = useState(null);
  const [groupList, setGroupList] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/dlog/groupList")
      .then((res) => {
        setGroupList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleClosePopup = () => {
    setGroupList([]);
    setError(null);
    setGroupTitle(null);
    setTogglePopup(false);
  };

  const handleGroupTitle = (value) => {
    setGroupTitle(value);
  };

  const handleAdd = async () => {
    console.log(groupTitle);
    if (!groupTitle) {
      setError({
        error: true,
        msg: "그룹 이름을 입력해주세요.",
      });
      return;
    }

    for (let group of groupList) {
      if (group.groupTitle === groupTitle) {
        setError({
          ...error,
          error: true,
          msg: "중복되는 이름의 그룹이 존재합니다.",
        });
        return;
      }
    }

    //
    let res = await axiosInstance.post("/dlog/groupSave", {
      groupTitle: groupTitle,
    });

    if (res.status === 200) {
      alert("그룹이 생성되었습니다.");
      window.location.href = "/dlog/list";
    } else {
      alert("일시적 오류로 그룹 생성에 실패했습니다.");
      return;
    }
  };

  return (
    <Dialog open={togglePopup} onClose={handleClosePopup} id="add-popup">
      <DialogContent>
        <FormControl sx={{ width: "100%" }} className="add-form-control">
          <Grid2 container>
            <Grid2 size={2} className="add-form-label">
              제목 (Title)
            </Grid2>
            <Grid2 size={10}>
              <TextField
                sx={{ margin: 0 }}
                fullWidth
                type="text"
                variant="standard"
                value={groupTitle}
                error={error}
                helperText={error ? error.msg : ""}
                onChange={(event) => handleGroupTitle(event.target.value)}
              ></TextField>
            </Grid2>
          </Grid2>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAdd} autoFocus>
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
