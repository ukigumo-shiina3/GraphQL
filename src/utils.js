const jwt = require("jsonwebtoken");
APP_SECRET = "5ce3d9f085632";

// トークンを複合するための関数
function getTokenPayload(token) {
  //トークン化された物の前の情報(user,id)を複合
  return jwt.verify(Token, APP_SECRET);
}

// ユーザーIDを取得するための関数
function getUserId(req, authToken) {
  if (req) {
    // ヘッダーの確認と認証権限の確認
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.replace("Bearer", "");
      if (!token) {
        throw new Error("トークンが見つかりませんでした");
      }
    }
    // トークンの複合
    const { userId } = getTokenPayload(token);
    return userId;
  } else if (authToken) {
    const { userId } = getTokenPayload(authToken);
  }
  throw new Error("認証権限がありません");
}

module.exports = {
  APP_SECRET,
  getUserId,
};
