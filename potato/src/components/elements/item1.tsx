import React, { useEffect, useState } from "react";
import { Container, Box, Typography, CircularProgress } from "@mui/material";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Work {
  fs_id: number;
  server_filename: string;
  thumbs: {
    url3: string;
  };
}

const ItemOne: React.FC = () => {
  const [works, setWorks] = useState<Work[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get<Work[]>("/api/baidu/2025works/big");
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
      <Container
        sx={{
          textAlign: "center",
          mt: 4,
          color: "#fff",
          minHeight: "50vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress color="inherit" />
      </Container>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    pauseOnHover: true,
  };

  return (
    <Box sx={{ backgroundColor: "#121212", minHeight: "100vh", py: 8 }}>
      <Container sx={{ textAlign: "center", mb: 6 }}>
        <Typography
          variant="h4"
          gutterBottom
          sx={{ fontWeight: 600, color: "#fff" }}
        >
          大场景·作品展示
        </Typography>
        <Typography variant="body1" sx={{ color: "#ccc" }}>
          标题没有想好
        </Typography>
      </Container>

      <Container>
        <Slider {...settings}>
          {works.map((work) => (
            <Box key={work.fs_id} sx={{ textAlign: "center" }}>
              <Box
                component="img"
                src={work.thumbs.url3}
                alt={work.server_filename}
                sx={{
                  width: { xs: "95%", sm: "80%", md: "70%" }, // 调大宽度
                  maxHeight: "80vh", // 限制高度，防止超屏
                  objectFit: "contain", // 保持图片比例
                  mx: "auto",
                  borderRadius: 4,
                  boxShadow: "0 6px 30px rgba(255,255,255,0.15)",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  "&:hover": {
                    transform: "scale(1.03)",
                    boxShadow: "0 10px 40px rgba(255,255,255,0.25)",
                  },
                }}
              />
            </Box>
          ))}
        </Slider>
      </Container>
    </Box>
  );
};

export default ItemOne;
