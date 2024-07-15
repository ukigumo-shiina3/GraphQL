const bycrypt = require("bcryptjs");
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
  }
}
