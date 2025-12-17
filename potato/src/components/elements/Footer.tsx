import { Box, Typography } from "@mui/material";
import code1 from "../../assets/code1.jpg";
import code2 from "../../assets/code2.png";

export const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        backgroundColor: "#2d2d2d", 
        color: "#f9a8d4", // pink-300
       boxShadow: "inset 0 1px 35px #f8648e80",
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: 4,
          py: 5,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* 左侧文案 */}
        <Box>
          <Typography
            sx={{
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: 0.5,
            }}
          >
            GalleryShow 2025
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              opacity: 0.7,
              mt: 0.5,
            }}
          >
            © 2025 All rights reserved
          </Typography>
        </Box>

        {/* 右侧二维码 */}
        <Box sx={{ display: "flex", gap: 3 }}>
          {[{ src: code1, label: "小红书" }, { src: code2, label: "抖音" }].map(
            (item) => (
              <Box
                key={item.label}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Box
                  component="img"
                  src={item.src}
                  alt={item.label}
                  sx={{
                    width: 60,
                    height: 60,
                    borderRadius: 1,
                    backgroundColor: "#f8648d",
                    p: 0.3,
                  }}
                />
                <Typography
                  sx={{
                    fontSize: 12,
                    opacity: 0.7,
                    mt: 0.5,
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
};
