export type BaiduToken = {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
};
declare global {
  var baiduToken: BaiduToken | undefined;
}

export {};
