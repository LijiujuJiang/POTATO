import { Router } from "express";
import { authRedirect, authCallback, get2025WorksFiles, get2025WorksFilesItemOne, get2025WorksFilesItemThree } from "../controllers/baiduController.js";

const router = Router();

// 1️⃣ 跳转百度授权页
// 前端点击“授权百度网盘”时访问
// GET /api/baidu/auth
router.get("/auth", authRedirect);

// 2️⃣ 授权回调
// 百度授权成功后会重定向到这个 URL
// GET /api/baidu/callback?access_token=xxx
router.get("/callback", authCallback);

// 3️⃣ 获取 /2025作品 文件夹下文件列表
// 前端访问此接口获取文件 JSON
// GET /api/baidu/2025works
router.get("/2025works", get2025WorksFiles);
router.get("/2025works/big", get2025WorksFilesItemOne);
router.get("/2025works/wonder", get2025WorksFilesItemThree);

export default router;
