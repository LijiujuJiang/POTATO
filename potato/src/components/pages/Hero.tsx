import { Box } from "@mui/material";
import { Navbar } from "../elements/Navbar";
import { Footer } from "../elements/Footer";
import { HomeBanner } from "../elements/Homebanner";
import { Homecard } from "../cards/Homecard";

export const Hero = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#020100",
        display: "flex",
        flexDirection: "column",

        /* 移动端安全区（iOS） */
        pb: "env(safe-area-inset-bottom)",

        /* 防止横向溢出 */
        overflowX: "hidden",
      }}
    >
      <Navbar />

      {/* 主体内容 */}
      <Box sx={{ flex: 1 }}>
        <HomeBanner />
        <Homecard />
      </Box>

      <Footer />
    </Box>
  );
};
