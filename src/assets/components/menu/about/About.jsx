import React, { useState } from "react";
import { Box, Grid2, IconButton } from "@mui/material";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";

// PDF.js worker 설정 (필수)
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs";

const About = () => {
  const [pages, setPages] = useState(null);
  const [selectedPage, setSelectedPage] = useState(0);

  const onDocumentLoadSuccess = (pdf) => {
    setPages(pdf.numPages);
    setSelectedPage(1);
  };

  const handlePage = (seq) => {
    let next = selectedPage + seq;

    if (next < 1) {
      next = 5;
    }

    if (next > 5) {
      next = 1;
    }

    setSelectedPage(next);
  };

  return (
    <Box
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <Grid2 container id="about-me-box">
        <Grid2 size={12} className="col">
          <span id="about-me-pages">
            {selectedPage} / {pages}
          </span>
        </Grid2>
        <Grid2 size={1} className="col">
          <IconButton size="large" onClick={() => handlePage(-1)}>
            <ArrowBackIos
              fontSize="inherit"
              sx={{ transform: "translateX(0.15em)" }}
            />
          </IconButton>
        </Grid2>
        <Grid2 size={10} className="col">
          <Document
            id="about-pdf-wrapper"
            file="/Resume.pdf" // public 폴더에 넣은 PDF 경로
            onLoadSuccess={onDocumentLoadSuccess}
          >
            <Page
              id="about-pdf-page"
              key={`page_` + selectedPage}
              pageNumber={selectedPage}
              renderAnnotationLayer={false} // 주석 링크 제거
              renderTextLayer={false} // 텍스트 겹침 제거
            />
          </Document>
        </Grid2>
        <Grid2 size={1} className="col">
          <IconButton size="large" onClick={() => handlePage(1)}>
            <ArrowForwardIos fontSize="inherit" />
          </IconButton>
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default About;
