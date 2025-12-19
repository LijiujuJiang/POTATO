import axios from "axios";
import { getAccessToken, setAccessToken } from "../utils/tokenStore.js";
import qs from "qs";

const FILE_LIST_URL = "https://pan.baidu.com/rest/2.0/xpan/file?method=list";
const TOKEN_URL = "https://openapi.baidu.com/oauth/2.0/token";

/**
 * 用 code 换取 access_token
 */
export const exchangeToken = async (code: string) => {
    try {
        const response = await axios.post(
            TOKEN_URL,
            qs.stringify({
                grant_type: "authorization_code",
                code,
                client_id: process.env.BAIDU_CLIENT_ID,
                client_secret: process.env.BAIDU_CLIENT_SECRET,
                redirect_uri: process.env.BAIDU_REDIRECT_URI,
            }),
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );

        const data = response.data;

        if (data.access_token) {
            // 存储到 tokenStore
            setAccessToken(data.access_token);
        }

        return data; // 返回完整 JSON，包括 access_token, refresh_token 等
    } catch (error: any) {
        console.error("Exchange token error:", error.response?.data || error.message);
        throw error;
    }
};
/**
 * 获取 /2025作品 文件夹下的文件列表
 */
export const fetch2025WorksFiles = async () => {
    const token = getAccessToken();
    if (!token) throw new Error("No access token, please authorize first");

    try {
        // 先获取根目录文件列表
        const response = await axios.get(FILE_LIST_URL, {
            params: {
                access_token: token,
                dir: "/2025作品", // 根目录
                start: 0,
                limit: 100,
                web: 1,
            },
        });

        const data = response.data;

        if (!data.list || !Array.isArray(data.list)) {
            return null;
        }
        return data.list;
    } catch (error: any) {
        console.error("Fetch files error:", error.response?.data || error.message);
        throw error;
    }

};

/**
 * 获取 /2025作品/大场景 文件夹下的文件列表
 */
export const fetch2025WorksFilesItemOne = async () => {
  const token = getAccessToken();
  if (!token) throw new Error("No access token, please authorize first");

  try {
    /** Step 1：获取 /2025作品 下的文件夹列表 */
    const rootRes = await axios.get(FILE_LIST_URL, {
      params: {
        access_token: token,
        dir: "/2025作品",
        start: 0,
        limit: 100,
        web: 1,
      },
    });

    const rootData = rootRes.data;

    if (!rootData.list || !Array.isArray(rootData.list)) {
      return [];
    }

    /** Step 2：找到 server_filename === "大场景" 的文件夹 */
    const targetFolder = rootData.list.find(
      (item: any) => item.isdir === 1 && item.server_filename === "大场景"
    );

    if (!targetFolder) {
      throw new Error("未找到 大场景 文件夹");
    }

    /** Step 3：使用 path 打开该文件夹 */
    const folderRes = await axios.get(FILE_LIST_URL, {
      params: {
        access_token: token,
        dir: targetFolder.path, // ⭐ 关键点
        start: 0,
        limit: 100,
        web: 1,
      },
    });

    const folderData = folderRes.data;

    if (!folderData.list || !Array.isArray(folderData.list)) {
      return [];
    }

    /** Step 4：返回大场景里的内容 */
    return folderData.list;

  } catch (error: any) {
    console.error("Fetch files error:", error.response?.data || error.message);
    throw error;
  }
};

/**
 * 获取 /2025作品/寰宇奇迹 文件夹下的文件列表
 */
export const fetch2025WorksFilesItemThree = async () => {
  const token = getAccessToken();
  if (!token) throw new Error("No access token, please authorize first");

  try {
    /** Step 1：获取 /2025作品 下的文件夹列表 */
    const rootRes = await axios.get(FILE_LIST_URL, {
      params: {
        access_token: token,
        dir: "/2025作品",
        start: 0,
        limit: 100,
        web: 1,
      },
    });

    const rootData = rootRes.data;

    if (!rootData.list || !Array.isArray(rootData.list)) {
      return [];
    }

    /** Step 2：找到 server_filename === "大场景" 的文件夹 */
    const targetFolder = rootData.list.find(
      (item: any) => item.isdir === 1 && item.server_filename === "寰宇奇迹"
    );

    if (!targetFolder) {
      throw new Error("未找到 寰宇奇迹 文件夹");
    }

    /** Step 3：使用 path 打开该文件夹 */
    const folderRes = await axios.get(FILE_LIST_URL, {
      params: {
        access_token: token,
        dir: targetFolder.path, // ⭐ 关键点
        start: 0,
        limit: 100,
        web: 1,
      },
    });

    const folderData = folderRes.data;

    if (!folderData.list || !Array.isArray(folderData.list)) {
      return [];
    }

    /** Step 4：返回内容 */
    return folderData.list;

  } catch (error: any) {
    console.error("Fetch files error:", error.response?.data || error.message);
    throw error;
  }
};

