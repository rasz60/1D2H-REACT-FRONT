import { Delete, Edit, List } from "@mui/icons-material";
import { Avatar, Box, Button, Chip } from "@mui/material";
import { useAuth } from "@src/context/AuthContext";
import axiosInstance from "@src/utils/axiosInstance";
import MDEditor from "@uiw/react-md-editor";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DevLogItemView = () => {
  const location = useLocation();
  const navigator = useNavigate();
  const [item, setItem] = useState({
    itemTitle: "",
  });

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

  const handleDeleteItem = async () => {
    let res = await axiosInstance.delete("/dlog/itemDelete/" + item.itemNo);
    if (res) {
      navigator("/dlog/list");
    }
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
              {item.deleteYn && (
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  startIcon={<Delete />}
                  onClick={() => handleDeleteItem}
                >
                  삭제
                </Button>
              )}
              {item.editYn && (
                <Button
                  variant="contained"
                  color="warning"
                  size="small"
                  startIcon={<Edit />}
                  onClick={() =>
                    (window.location.href =
                      "/dlog/item/form/" + item.groupNo + "/" + item.itemNo)
                  }
                >
                  수정
                </Button>
              )}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "grey",
                }}
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
            <MDEditor value={item.itemContents} preview="preview"></MDEditor>
          </Box>
        </Box>
      ) : (
        <></>
      )}
    </>
  );
};

export default DevLogItemView;
