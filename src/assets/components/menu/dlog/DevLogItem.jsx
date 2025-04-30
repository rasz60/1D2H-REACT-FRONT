import { List } from "@mui/icons-material";
import { Avatar, Box, Button, Chip, IconButton } from "@mui/material";
import axiosInstance from "@src/utils/axiosInstance";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
const DevLogItem = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const [item, setItem] = useState();
  useEffect(() => {
    getItem();
  }, []);

  const getItem = async () => {
    let pathArr = location.pathname.split("/");
    let res = await axiosInstance.get(
      "/dlog/itemDetails/" +
        pathArr[pathArr.length - 2] +
        "/" +
        pathArr[pathArr.length - 1]
    );

    if (!res.status === 200) {
      alert("일시적인 오류로 조회에 실패했습니다.", function () {
        navigator("/dlog/list");
      });
    } else {
      setItem(res.data);
    }
  };

  const handleEditor = (event) => {
    setItem({
      ...item,
      itemContents: event,
    });
  };

  return (
    <>
      {item ? (
        <Box id="item-box">
          <Box id="item-header">
            <h2 id="item-title">{item.itemTitle}</h2>
            <p id="item-reg-date">{item.itemRegistDate}</p>
            <Box id="item-langs">
              {item.itemLangs ? (
                item.itemLangs.map((lang) => (
                  <Chip
                    avatar={
                      <Avatar
                        className="lang-chip-avatar"
                        sx={{
                          backgroundColor: lang.langTypeColor,
                        }}
                      >
                        {lang.langType.substring(0, 1)}
                      </Avatar>
                    }
                    className="lang-chip"
                    label={lang.langName}
                    variant="outlined"
                  ></Chip>
                ))
              ) : (
                <></>
              )}
            </Box>
            <Box id="btn-box">
              <Button
                variant="contained"
                size="small"
                startIcon={<List />}
                onClick={() => navigator("/dlog/list")}
              >
                목록
              </Button>
            </Box>
            <hr />
          </Box>
          <Box id="item-contents">
            <MDEditor
              height={500}
              value={item.itemContents}
              onChange={handleEditor}
              preview="preview"
            ></MDEditor>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default DevLogItem;
