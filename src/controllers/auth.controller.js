const bcrypt = require("bcrypt");
const prisma = require("../prismaClient");

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. basic validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
      });
    }

    // 2. check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists with this email",
      });
    }

    // 3. hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // 5. send response (never send password)
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};
