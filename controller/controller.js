import bcrypt from "bcryptjs";
import Admin from "../models/admin.js";
import generateToken from "../utils/generateToken.js";

// Admin Signup
export const signupAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const exists = await Admin.findOne({ email });
    if (exists) return res.status(400).json({ error: "Admin already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    res.json({ message: "Admin created successfully" });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Admin Login
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) return res.status(400).json({ error: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

    res.json({
      token: generateToken(admin._id),
      email: admin.email,
    });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
};
