import express from "express";
import dotenv from "dotenv";
import baiduRoutes from "./routes/baidu.js";
import cors from "cors";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
// 启用 CORS，允许所有来源
app.use(cors());

// 注册百度网盘路由，所有路由都以 /api/baidu 开头
app.use("/api/baidu", baiduRoutes);

app.get("/", (_req, res) => res.send("Baidu OAuth Server Running"));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});


