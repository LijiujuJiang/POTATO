import React, { useEffect, useState } from "react";
import {
  Container,
  Box,
  Typography,
  CircularProgress,
  Grid,
  Dialog,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FadeInOnScroll from "../cards/FadeInOnScroll";
import axios from "axios";

interface Work {
  fs_id: number;
  server_filename: string;
  thumbs: {
    url3: string;
  };
}

const ItemFour: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Work[]>("/api/baidu/2025works/shed");
        setWorks(res.data);
      } catch (err) {
        console.error("Failed to fetch works:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#121212",
        }}
      >
        <CircularProgress sx={{ color: "#ec4899" }} />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: "#121212", py: 10 }}>
      <Container maxWidth="lg">
        {/* 标题 */}
        <Box sx={{ mb: 6, textAlign: "center" }}>
          <Typography
            variant="h4"
            sx={{
              color: "#fff",
              fontWeight: 600,
              letterSpacing: 2,
              mb: 1,
            }}
          >
            棚拍展示
          </Typography>
          <Typography sx={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
            Cosmic Wonders · 2025
          </Typography>
        </Box>

        {/* 摄影作品网格 */}
       <Grid container spacing={4}>
  {works.map((work, index) => (
    <Grid item xs={12} sm={6} md={4} key={work.fs_id}>
      <FadeInOnScroll delay={index * 80}>
        <Box
          onClick={() => {
            setSelectedWork(work);
            setPreviewOpen(true);
          }}
          sx={{
            position: "relative",
            overflow: "hidden",
            borderRadius: 2,
            cursor: "pointer",
            backgroundColor: "#1c1c1c",
            transition: "all 0.4s ease",

            "&:hover img": {
              transform: "scale(1.08)",
            },

            "&:hover .title": {
              opacity: 1,
            },
          }}
        >
          {/* 图片 */}
          <Box
            component="img"
            src={work.thumbs?.url3}
            alt={work.server_filename}
            sx={{
              width: "100%",
              height: 340,
              objectFit: "cover",
              transition: "transform 0.4s ease",
            }}
          />

          {/* 标题遮罩 */}
          <Box
            className="title"
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              px: 2,
              py: 1.5,
              background:
                "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0))",
              opacity: 0,
              transition: "opacity 0.3s ease",
            }}
          >
            <Typography sx={{ color: "#fff", fontSize: 14 }}>
              {work.server_filename}
            </Typography>
          </Box>
        </Box>
      </FadeInOnScroll>
    </Grid>
  ))}
</Grid>

      </Container>

      {/* 全屏预览 */}
      <Dialog
        fullScreen
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
      >
        <Box
          sx={{
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          {/* 关闭按钮 */}
          <IconButton
            onClick={() => setPreviewOpen(false)}
            sx={{
              position: "absolute",
              top: 24,
              right: 24,
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.08)",
              "&:hover": {
                backgroundColor: "rgba(236,72,153,0.25)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* 全屏图片 */}
          {selectedWork && (
            <Box
              component="img"
              src={selectedWork.thumbs?.url3}
              alt={selectedWork.server_filename}
              sx={{
                maxWidth: "92%",
                maxHeight: "92%",
                objectFit: "contain",
                borderRadius: 1,
                boxShadow: "0 30px 80px rgba(0,0,0,0.9)",
              }}
            />
          )}

          {/* 图片标题 */}
          {selectedWork && (
            <Typography
              sx={{
                position: "absolute",
                bottom: 28,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: 1,
                fontSize: 14,
              }}
            >
              {selectedWork.server_filename}
            </Typography>
          )}
        </Box>
      </Dialog>
    </Box>
  );
};

export default ItemFour;
