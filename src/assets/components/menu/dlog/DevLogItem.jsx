import axiosInstance from "@src/utils/axiosInstance";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const DevLogItem = () => {
  const location = useLocation();
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
};

export default DevLogItem;
