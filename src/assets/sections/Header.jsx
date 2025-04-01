import { useState } from 'react';
import { AppBar, Toolbar, Box } from "@mui/material";

const Header = () => {
    const [isScroll, setIsScroll] = useState(false);

    return (
      <AppBar id="header-wrapper" position="static" color="secondary">
        <Toolbar id="header" className={ isScroll ? 'scrolled' : 'notScrolled'}>
          <Box id="headerMenu" className={ isScroll ? 'scrolled' : 'notScrolled'}>
            
          </Box>
        </Toolbar>
      </AppBar>
    );
  };
  
  export default Header;