import React, { useEffect, useRef, useState } from "react";
import { Box } from "@mui/material";

interface FadeInOnScrollProps {
  children: React.ReactNode;
  delay?: number;
}

const FadeInOnScroll: React.FC<FadeInOnScrollProps> = ({
  children,
  delay = 0,
}) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.15, // 15% 出现/消失即触发，比较自然
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: visible ? 1 : 0,
        transform: visible
          ? "translateY(0)"
          : "translateY(40px)", // 上滑离开 → 向下隐去
        transition: `opacity 0.8s ease ${delay}ms,
                     transform 0.8s ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </Box>
  );
};

export default FadeInOnScroll;
