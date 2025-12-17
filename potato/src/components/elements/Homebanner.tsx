import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import banner from "../../assets/banner.png";

export const HomeBanner = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 420, sm: 500, md: 550 },
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        backgroundImage: `url(${banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* 模糊遮罩层 */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backdropFilter: {
            xs: "blur(0.5px)",
            sm: "blur(1px)",
          },
          backgroundColor: "rgba(0, 0, 0, 0.57)",
          zIndex: 1,
        }}
      />

      {/* 内容 */}
      <Box
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          px: { xs: 2, sm: 3 },
        }}
      >
        <Typography
          sx={{
            fontSize: { xs: 28, sm: 36, md: 42 },
            fontWeight: 700,
            letterSpacing: 1,
            lineHeight: { xs: 1.2, sm: 1.15 },
            color: "#fff",
          }}
        >
          GalleryShow 2025
        </Typography>

        <Typography
          sx={{
            mt: 1.2,
            fontSize: { xs: 14, sm: 16 },
            color: "rgba(255,255,255,0.75)",
            maxWidth: 360,
            mx: "auto",
          }}
        >
          Creative · Minimal · Showcase
        </Typography>

        <Button
          onClick={() => navigate("/projects")}
          sx={{
            mt: { xs: 3, sm: 4 },
            px: { xs: 4, sm: 5 },
            py: { xs: 1.2, sm: 1.5 },
            minWidth: 160,
            borderRadius: "999px",
            fontSize: 14,
            fontWeight: 600,
            letterSpacing: 1,
            color: "#fff",
            background:
              "linear-gradient(135deg, #ec4899, #f472b6)",
            boxShadow:
              "0 8px 24px rgba(236,72,153,0.35)",
            transition: "all 0.3s ease",

            "&:hover": {
              background:
                "linear-gradient(135deg, #f472b6, #ec4899)",
              boxShadow:
                "0 0 0 2px rgba(255,255,255,0.4), 0 12px 40px rgba(236,72,153,0.6)",
              transform: "translateY(-2px)",
            },
          }}
        >
          START
        </Button>
      </Box>
    </Box>
  );
};
