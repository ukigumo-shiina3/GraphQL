const bycrypt = require("bcryptjs");

async function signup(parent, args, context) {
  const password = await bycrypt.hash(args.password, 10);

  const user = await context.prisma.user.create({
    data: {
      ...args,
      password,
    },
  });
}
