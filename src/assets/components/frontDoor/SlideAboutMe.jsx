import { Divider, Grid2, IconButton } from "@mui/material";
import getFrontDoorUtils from "@js/frontdoor";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";

const SlideAboutMe = ({ vmode }) => {
  const [pageNum, setPageNum] = useState(0);
  const slideRef = useRef(0);
  const handleSlide = (seq) => {
    let next = 0;
    let min = 0;
    let max = 2;
    if (pageNum === min && seq < 0) {
      next = max;
    } else if (pageNum === max && seq > 0) {
      next = min;
    } else {
      next = pageNum + seq;
    }
    setPageNum(next);
  };

  useEffect(() => {
    // 슬라이드 이동
    if (slideRef.current) {
      slideRef.current.style.transform = `translateX(-${pageNum * 99.85}%)`;
    }
  }, [pageNum]);

  const { calculateDiffDate, generateIconText, generateSkillChip } =
    getFrontDoorUtils();

  return (
    <Grid2 container className="front-door-contents" spacing={1}>
      <Grid2
        size={1}
        className="slide-guide prev"
        onClick={(ev) => handleSlide(-1)}
      >
        <IconButton size="small">
          <ArrowBackIos />
        </IconButton>
      </Grid2>
      <Grid2 container size={10} className="slide">
        <div className="slide-wrapper" ref={slideRef}>
          {/*-- aboutMe::1st COL-EXPERIENCE --*/}
          <Grid2
            size={vmode.row1ColWidth}
            className={"front-door-contents-col " + vmode.size}
          >
            <span className="sub-title about-me-exp-bg">
              {generateIconText(vmode.size === "M" ? "exprience" : "exp", 1)}
            </span>
            <Divider></Divider>
            <Grid2 container spacing={1} className="sub-contents">
              <Grid2
                size={vmode.row1SubTitleWidth}
                className="sub-content-title"
              >
                포지션
              </Grid2>
              <Grid2
                size={vmode.row1SubContentWidth}
                className="sub-content-content"
              >
                'A'사 JAVA 백엔드 개발자
              </Grid2>

              <Grid2
                size={vmode.row1SubTitleWidth}
                className="sub-content-title"
              >
                주요업무
              </Grid2>
              <Grid2
                size={vmode.row1SubContentWidth}
                className="sub-content-content"
              >
                그룹웨어 개발 및 운영 업무
              </Grid2>

              <Grid2
                size={vmode.row1SubTitleWidth}
                className="sub-content-title"
              >
                근무기간
              </Grid2>
              <Grid2
                size={vmode.row1SubContentWidth}
                className="sub-content-content"
              >
                {calculateDiffDate("2022-06-13", null)} (2022.06 ~ 재직 중)
              </Grid2>

              <Grid2 size={12} className="sub-content-title skills">
                사용기술
              </Grid2>
              <Grid2
                size={vmode.row1SubContentWidth}
                className="sub-content-content skills"
              >
                {generateSkillChip("JAVA")}
                {generateSkillChip("SPRING")}
                {generateSkillChip("SPRING-BOOT")}
                {generateSkillChip("ORACLE")}
                {generateSkillChip("MSSQL")}
                {generateSkillChip("JSP")}
                {generateSkillChip("WebSquare")}
              </Grid2>
            </Grid2>
          </Grid2>

          {/* aboutMe::2nd COL-PROJECT */}
          <Grid2
            size={vmode.row1ColWidth}
            className={"front-door-contents-col " + vmode.size}
          >
            <span className="sub-title about-me-prj-bg">
              {generateIconText(vmode.size === "M" ? "lastest" : "last", 1)}
            </span>
            <Divider></Divider>

            <Grid2 container spacing={1} className="sub-contents">
              <Grid2
                size={vmode.row1SubTitleWidth}
                className="sub-content-title"
              >
                프로젝트
              </Grid2>
              <Grid2
                size={vmode.row1SubContentWidth}
                className="sub-content-content"
              >
                외부망 시스템 실시간 연동 기능 개발
              </Grid2>

              <Grid2
                size={vmode.row1SubTitleWidth}
                className="sub-content-title"
              >
                기간
              </Grid2>
              <Grid2
                size={vmode.row1SubContentWidth}
                className="sub-content-content"
              >
                {calculateDiffDate("2025-01-01", "2025-07-07")} (2025.01 ~
                2025.07)
              </Grid2>

              <Grid2 size={12} className="sub-content-title">
                업무내역
              </Grid2>
              <Grid2 size={12} className="sub-content-content">
                <ul className={vmode.size}>
                  <li>
                    <span> - </span>신규 화면 전체 및 총 25건 API 설계 및 구현
                  </li>
                  <li>
                    <span> - </span>validation, 예외 처리, 응답 등 공통 로직
                    구현
                  </li>
                </ul>
              </Grid2>

              <Grid2 size={12} className="sub-content-title">
                사용기술
              </Grid2>
              <Grid2 size={12} className="sub-content-content skills">
                {generateSkillChip("JAVA")}
                {generateSkillChip("SPRING-BATCH")}
                {generateSkillChip("SPRING-BOOT")}
                {generateSkillChip("ORACLE")}
                {generateSkillChip("WebSquare")}
              </Grid2>
            </Grid2>
          </Grid2>
          {/* aboutMe::3rd COL-SKILLS */}
          <Grid2
            size={vmode.row1ColWidth}
            className={"front-door-contents-col " + vmode.size}
          >
            <span className="sub-title about-me-skill-bg">
              {generateIconText(vmode.size === "M" ? "skills" : "lang", 1)}
            </span>
            <Divider></Divider>
            <Grid2 container spacing={1} className="sub-contents">
              <Grid2 size={12} className="sub-content-title">
                BACKEND
              </Grid2>
              <Grid2 size={12} className="sub-content-content skills">
                {generateSkillChip("JAVA")}
                {generateSkillChip("SPRING")}
                {generateSkillChip("SPRING-BOOT")}
              </Grid2>

              <Grid2 size={12} className="sub-content-title">
                FRONTEND
              </Grid2>
              <Grid2 size={12} className="sub-content-content skills">
                {generateSkillChip("JSP")}
                {generateSkillChip("WebSquare")}
                {generateSkillChip("REACT")}
                {generateSkillChip("VUEJS")}
              </Grid2>

              <Grid2 size={12} className="sub-content-title">
                DATABASE
              </Grid2>
              <Grid2 size={12} className="sub-content-content skills">
                {generateSkillChip("ORACLE")}
                {generateSkillChip("MSSQL")}
                {generateSkillChip("MYSQL")}
                {generateSkillChip("POSTGRESQL")}
              </Grid2>
            </Grid2>
          </Grid2>
        </div>
      </Grid2>

      <Grid2
        size={1}
        className="slide-guide next"
        onClick={(ev) => handleSlide(1)}
      >
        <IconButton size="small">
          <ArrowForwardIos />
        </IconButton>
      </Grid2>
    </Grid2>
  );
};
export default SlideAboutMe;
