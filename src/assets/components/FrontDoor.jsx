import {
  Box,
  Grid2,
  Button,
  Divider,
  IconButton,
  Chip,
  Avatar,
} from "@mui/material";
import Icon from "@mdi/react";
import getIcon from "@js/menuIcon.js";
import { Search } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const FrontDoor = () => {
  const { getMdiIcon } = getIcon();
  const navigate = useNavigate();

  const calculateDiffDate = (start, end) => {
    let dateStr = "";
    let sDate = new Date(start);
    let eDate = null;

    if (end === null || end === "") {
      eDate = new Date();
    } else {
      eDate = new Date(end);
    }

    let diff = eDate.getTime() - sDate.getTime();

    let year = 365 * 24 * 60 * 60 * 1000;
    let month = 30 * 24 * 60 * 60 * 1000;

    let y = parseInt(diff / year);
    let m = Math.ceil((diff - y * year) / month);

    if (y > 0) {
      dateStr += y + "년";
    }

    if (m > 0) {
      dateStr += (y > 0 ? " " : "") + m + "개월";
    }

    return dateStr;
  };

  const generateIconText = (keyword, size) => {
    return keyword
      .split("")
      .map((char) => (
        <Icon path={getMdiIcon(char)} size={size} color="primary" />
      ));
  };

  const generateSkillChip = (type, name) => {
    let avatarClassName = "skill-" + type;
    let avatarLabel = type.substring(0, 1).toUpperCase();
    return (
      <Chip
        avatar={<Avatar className={avatarClassName}>{avatarLabel}</Avatar>}
        size="small"
        label={name}
        variant="outlined"
      ></Chip>
    );
  };

  const handleSeeMore = (nav) => {
    navigate(nav);
  };

  return (
    <Box>
      <Grid2 container>
        <Grid2 size={11}>
          {/*-- FRONT DOOR::1st ROW-aboutMe::TITLE --*/}
          <h2 className="front-door-title">
            {generateIconText("about me", 1.5)}
            &nbsp;&nbsp;❓
          </h2>
        </Grid2>
        <Grid2 size={1} className="front-door-btn-more">
          <Button onClick={() => handleSeeMore("/about")} size="small">
            more&nbsp;&nbsp;{<Search />}
          </Button>
        </Grid2>

        {/*-- FRONT DOOR::1st ROW-aboutMe::CONTENT --*/}
        <Grid2 container className="front-door-contents" spacing={1}>
          {/*-- aboutMe::1st COL-EXPERIENCE --*/}
          <Grid2 size={4} className="front-door-contents-col">
            <span className="sub-title about-me-exp-bg">
              {generateIconText("exprience", 1)}
            </span>
            <Divider></Divider>
            <Grid2 container spacing={1} className="sub-contents">
              <Grid2 size={3} className="sub-content-title">
                포지션
              </Grid2>
              <Grid2 size={9} className="sub-content-content">
                'A'사 JAVA 백엔드 개발자
              </Grid2>

              <Grid2 size={3} className="sub-content-title">
                주요업무
              </Grid2>
              <Grid2 size={9} className="sub-content-content">
                협력사 그룹웨어 개발 및 운영 업무
              </Grid2>

              <Grid2 size={3} className="sub-content-title">
                근무기간
              </Grid2>
              <Grid2 size={9} className="sub-content-content">
                {calculateDiffDate("2022-06-13", null)} (2022.06 ~ 재직 중)
              </Grid2>

              <Grid2 size={12} className="sub-content-title">
                사용기술
              </Grid2>
              <Grid2 size={12} className="sub-content-content skills">
                {generateSkillChip("be", "JAVA")}
                {generateSkillChip("fw", "SPRING")}
                {generateSkillChip("fw", "SPRING-BOOT")}
                {generateSkillChip("db", "ORACLE")}
                {generateSkillChip("db", "MSSQL")}
                {generateSkillChip("fe", "JSP")}
                {generateSkillChip("fe", "WebSquare")}
              </Grid2>
            </Grid2>
          </Grid2>

          {/*-- aboutMe::2nd COL-PROJECT --*/}
          <Grid2 size={4} className="front-door-contents-col">
            <span className="sub-title about-me-prj-bg">
              {generateIconText("project", 1)}
            </span>
            <Divider></Divider>

            <Grid2 container spacing={1} className="sub-contents">
              <Grid2 size={3} className="sub-content-title">
                프로젝트
              </Grid2>
              <Grid2 size={9} className="sub-content-content">
                외부망 시스템 실시간 연동 기능 개발
              </Grid2>

              <Grid2 size={3} className="sub-content-title">
                기간
              </Grid2>
              <Grid2 size={9} className="sub-content-content">
                {calculateDiffDate("2025-01-01", "2025-07-07")} (2025.01 ~
                2025.07)
              </Grid2>

              <Grid2 size={12} className="sub-content-title">
                업무내역
              </Grid2>
              <Grid2 size={12} className="sub-content-content">
                <ul>
                  <li>신규 화면 전체 및 총 25건 API 설계 및 구현</li>
                  <li>validation, 예외 처리, 응답 등 공통 로직 구현</li>
                </ul>
              </Grid2>

              <Grid2 size={12} className="sub-content-title">
                사용기술
              </Grid2>
              <Grid2 size={12} className="sub-content-content skills">
                {generateSkillChip("be", "JAVA")}
                {generateSkillChip("be", "SPRING-BATCH")}
                {generateSkillChip("fw", "SPRING-BOOT")}
                {generateSkillChip("db", "ORACLE")}
                {generateSkillChip("fe", "WebSquare")}
              </Grid2>
            </Grid2>
          </Grid2>

          {/*-- aboutMe::3rd COL-SKILLS --*/}
          <Grid2 size={4} className="front-door-contents-col">
            <span className="sub-title about-me-skill-bg">
              {generateIconText("skills", 1)}
            </span>
            <Divider></Divider>
            <Grid2 container spacing={1} className="sub-contents">
              <Grid2 size={12} className="sub-content-title">
                BACKEND
              </Grid2>
              <Grid2 size={12} className="sub-content-content skills">
                {generateSkillChip("be", "JAVA")}
                {generateSkillChip("fw", "SPRING")}
                {generateSkillChip("fw", "SPRING-BOOT")}
              </Grid2>

              <Grid2 size={12} className="sub-content-title">
                FRONTEND
              </Grid2>
              <Grid2 size={12} className="sub-content-content skills">
                {generateSkillChip("fe", "JSP")}
                {generateSkillChip("fe", "WebSquare")}
                {generateSkillChip("fe", "REACT")}
                {generateSkillChip("fe", "VUEJS")}
              </Grid2>

              <Grid2 size={12} className="sub-content-title">
                DATABASE
              </Grid2>
              <Grid2 size={12} className="sub-content-content skills">
                {generateSkillChip("db", "ORACLE")}
                {generateSkillChip("db", "MSSQL")}
                {generateSkillChip("db", "MYSQL")}
                {generateSkillChip("db", "POSTGRESQL")}
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>

        {/*-- FRONT DOOR::2nd ROW-devLog::TITLE--*/}
        <Grid2 size={11}>
          {/*-- FRONT DOOR::1st ROW-aboutMe::TITLE --*/}
          <h2 className="front-door-title">
            {generateIconText("devlog", 1.5)}
            &nbsp;&nbsp;❗
          </h2>
        </Grid2>
        <Grid2 size={1} className="front-door-btn-more">
          <Button onClick={() => handleSeeMore("/dlog")} size="small">
            more&nbsp;&nbsp;{<Search />}
          </Button>
        </Grid2>

        {/*-- FRONT DOOR::2nd ROW-devLog::CONTENT--*/}
        <Grid2 size={12}>
          <Grid2 container className="front-door-contents" spacing={1}>
            <Grid2 size={4} className="front-door-contents-col"></Grid2>
            <Grid2 size={4} className="front-door-contents-col"></Grid2>
            <Grid2 size={4} className="front-door-contents-col"></Grid2>
          </Grid2>
        </Grid2>

        <Grid2 size={11}>
          {/*-- FRONT DOOR::3rd ROW-codingTest::TITLE --*/}
          <h2 className="front-door-title">
            {generateIconText("coding test", 1.5)}
            &nbsp;&nbsp;✍️
          </h2>
        </Grid2>
        <Grid2 size={1} className="front-door-btn-more">
          <Button onClick={() => handleSeeMore("/cote")} size="small">
            more&nbsp;&nbsp;{<Search />}
          </Button>
        </Grid2>

        {/*-- FRONT DOOR::3rd ROW-codingTest::CONTENT--*/}
        <Grid2 size={12}>
          <Grid2 container className="front-door-contents" spacing={1}>
            <Grid2 size={4} className="front-door-contents-col"></Grid2>
            <Grid2 size={4} className="front-door-contents-col"></Grid2>
            <Grid2 size={4} className="front-door-contents-col"></Grid2>
          </Grid2>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default FrontDoor;
