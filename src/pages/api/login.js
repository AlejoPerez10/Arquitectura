import dbConnect from "/lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === "POST") {
        const { email, password } = req.body;

        try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // Por ahora comparamos contraseñas en texto plano (luego se puede encriptar con bcrypt)
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Si todo va bien
        res.status(200).json({
            message: "Login successful",
            user: {
            id: user._id,
            name: user.name,
            lastName: user.lastName,
            email: user.email,
            },
        });
        } catch (error) {
        res.status(500).json({ message: "Server error", error });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
