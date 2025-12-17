import { Box } from "@mui/material";
import { FadeCard } from "./Fadecard";

type CardItem = {
  image: string;
  title: string;
  desc: string;
};

const cardData: CardItem[] = [
  {
    image: "/images/demo1.jpg",
    title: "Design System",
    desc: "统一的设计语言与组件规范，提升产品一致性与开发效率。",
  },
  {
    image: "/images/demo2.jpg",
    title: "Motion Experience",
    desc: "克制而精准的动效设计，让交互反馈更自然、更高级。",
  },
  {
    image: "/images/demo3.jpg",
    title: "Engineering Quality",
    desc: "工程与体验并重，确保性能、可维护性与可扩展性。",
  },
];

export const Homecard = () => {
  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 1200,
        mx: "auto",

        /* 响应式内边距 */
        py: { xs: 6, sm: 8, md: 10 },
        px: { xs: 2, sm: 3, md: 0 },

        display: "flex",
        flexDirection: "column",

        /* 卡片间距响应式 */
        gap: { xs: 6, sm: 8, md: 10 },
      }}
    >
      {cardData.map((item, index) => (
        <FadeCard key={index} {...item} />
      ))}
    </Box>
  );
};
