const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

APP_SECRET = "5ce3d9f085632";

async function signup(parent, args, context) {
  const password = await bycrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    },
  });

  const token = jwt.sign({ userId: user.id }, APP_SECRET);

  return {
    token,
    user,
  };
}

// ユーザーログイン
async function login(parent, args, context) {
  const user = await context.prisma.user.findUnique({
    where: { email: args.email },
  });
  if (!user) {
    throw new Error("そのようなユーザーは存在しません");
  }

  // パスワードの比較
  const valid = await bcrypt.compare(args.password, user.password);
  if (!valid) {
    throw new Error("無効なパスワードです");
  }

  // パスワードが正しい時
  const token = jwt.sign({ userId: user.id });

  return {
    token,
    user,
  };
}
