import { Box, Divider, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

type FadeCardProps = {
  image: string;
  title: string;
  desc: string;
};

export const FadeCard = ({ image, title, desc }: FadeCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "stretch", md: "center" },
        gap: { xs: 3, md: 4 },
        p: { xs: 3, md: 4 },
        borderRadius: 4,
        backdropFilter: "blur(12px)",
        background: "rgba(255, 255, 255, 1)",
        boxShadow: "0 20px 60px rgba(0,0,0,0.08)",

        /* 动画 */
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0)"
          : { xs: "translateY(24px)", md: "translateY(40px)" },
        transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* 图片 */}
      <Box
        sx={{
          width: { xs: "100%", md: 260 },
          height: { xs: 180, sm: 200, md: 160 },
          borderRadius: 3,
          overflow: "hidden",
          flexShrink: 0,
        }}
      >
        <Box
          component="img"
          src={image}
          alt={title}
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* 分割线 */}
      <Divider
        orientation={undefined}
        sx={{
          alignSelf: "stretch",
          borderColor: "#ff4598",
          opacity: 0.6,

          /* 响应式方向 */
          ...( {
            xs: {
              height: "1px",
              width: "100%",
              my: 1,
            },
            md: {
              width: "1px",
              height: "auto",
              mx: 2,
            },
          } as any ),
        }}
      />

      {/* 文本 */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            mb: 1,
            letterSpacing: "0.02em",
            fontSize: { xs: 18, md: 22 },
          }}
        >
          {title}
        </Typography>

        <Typography
          sx={{
            color: "#ff4598",
            lineHeight: 1.7,
            maxWidth: { md: 480 },
            fontSize: { xs: 14, md: 16 },
          }}
        >
          {desc}
        </Typography>
      </Box>
    </Box>
  );
};
