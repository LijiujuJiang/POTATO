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
import axios from "axios";
import FadeInOnScroll from "../cards/FadeInOnScroll";

interface Work {
  fs_id: number;
  server_filename: string;
  thumbs: {
    url3: string;
  };
}

const ItemTwo: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? works.length - 1 : currentIndex - 1;

    setCurrentIndex(prevIndex);
    setSelectedWork(works[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = currentIndex === works.length - 1 ? 0 : currentIndex + 1;

    setCurrentIndex(nextIndex);
    setSelectedWork(works[nextIndex]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Work[]>("/api/baidu/2025works/single");
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
            Portrait Series
          </Typography>
          <Typography
            sx={{
              color: "rgba(255,255,255,0.6)",
              fontSize: 14,
            }}
          >
            Selected Photography Works · 2025
          </Typography>
        </Box>

        {/* 图片网格 */}
        <Grid container spacing={4}>
         
          {works.map((work,index) => (
            <Grid item xs={12} sm={6} md={4} key={work.fs_id}>
                <FadeInOnScroll delay={index * 80}>
              <Box
                onClick={() => {
                  const index = works.findIndex((w) => w.fs_id === work.fs_id);
                  setCurrentIndex(index);
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
                    transform: "scale(1.06)",
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
                    height: 320,
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                />

                {/* 底部标题遮罩 */}
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
                      "linear-gradient(to top, rgba(0,0,0,0.7), rgba(0,0,0,0))",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#fff",
                      fontSize: 14,
                      fontWeight: 500,
                      letterSpacing: 0.5,
                    }}
                  >
                    {work.server_filename}
                  </Typography>
                </Box>
              </Box>
              </FadeInOnScroll>
            </Grid>
          ))}
        </Grid>
      </Container>

      <Dialog
        fullScreen
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        sx={{
          backgroundColor: "rgba(0,0,0,0.95)",
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            backgroundColor: "#000",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton
            onClick={handlePrev}
            sx={{
              position: "absolute",
              left: 32,
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(6px)",
              "&:hover": {
                backgroundColor: "rgba(236,72,153,0.25)",
              },
            }}
          >
            ‹
          </IconButton>
          {/* 关闭按钮 */}
          <IconButton
            onClick={() => setPreviewOpen(false)}
            sx={{
              position: "absolute",
              top: 20,
              right: 20,
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.08)",
              "&:hover": {
                backgroundColor: "rgba(236,72,153,0.25)",
              },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* 图片 */}
          {selectedWork && (
            <Box
              component="img"
              src={selectedWork.thumbs?.url3}
              alt={selectedWork.server_filename}
              sx={{
                maxWidth: "90%",
                maxHeight: "90%",
                objectFit: "contain",
                borderRadius: 1,
                boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
              }}
            />
          )}

          {/* 底部标题 */}
          {selectedWork && (
            <Typography
              sx={{
                position: "absolute",
                bottom: 24,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: 1,
                fontSize: 14,
              }}
            >
              {selectedWork.server_filename}
            </Typography>
          )}

          <IconButton
            onClick={handleNext}
            sx={{
              position: "absolute",
              right: 32,
              color: "#fff",
              backgroundColor: "rgba(255,255,255,0.06)",
              backdropFilter: "blur(6px)",
              "&:hover": {
                backgroundColor: "rgba(236,72,153,0.25)",
              },
            }}
          >
            ›
          </IconButton>
        </Box>
      </Dialog>
    </Box>
  );
};

export default ItemTwo;
