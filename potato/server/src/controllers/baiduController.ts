import { Request, Response } from "express";
import { setAccessToken } from "../utils/tokenStore.js";
import { exchangeToken, fetch2025WorksFiles, fetch2025WorksFilesItemOne, } from "../services/baiduService.js";

export const authRedirect = (_: Request, res: Response) => {
    const url = "https://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=blp8WoSl8U2w6FPGqtqsai1UE4Optr5d&redirect_uri=http://localhost:3001/api/baidu/callback&scope=basic,netdisk";

    res.redirect(url);
};

export const authCallback = async (req: Request, res: Response) => {
    const code = req.query.code as string;
    if (!code) return res.status(400).send("Missing code");

    try {
        const tokenData = await exchangeToken(code); // 通过 code 获取 access_token
        res.json(tokenData);
    } catch (err) {
        res.status(500).json({ error: "Failed to get access token" });
    }
};


/**
 * 获取 /2025作品 文件夹下文件列表
 */
export const get2025WorksFiles = async (_: Request, res: Response) => {
    try {
        const files = await fetch2025WorksFiles();

     

        res.json(files);
    } catch (err: any) {
        console.error("Error fetching files:", err);
        res.status(500).json({ error: err.message || "Failed to fetch files" });
    }
};

/**
 * 获取 /2025作品 大场景文件夹下文件列表
 */
export const get2025WorksFilesItemOne = async (_: Request, res: Response) => {
    try {
        const files = await fetch2025WorksFilesItemOne();

        // 打印 JSON 到终端
        console.log("Files in /大场景:", JSON.stringify(files, null, 2));

        res.json(files);
    } catch (err: any) {
        console.error("Error fetching files:", err);
        res.status(500).json({ error: err.message || "Failed to fetch files" });
    }
};
