import dbConnect from "../../../lib/mongodb";
import User from "@/models/User";

export default async function handler(req, res) {
    await dbConnect();

    if (req.method === "POST") {
        const { name, lastName, email, password } = req.body;

        try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const user = await User.create({ name, lastName, email, password });
        res.status(201).json({ message: "User created", user });
        } catch (error) {
        res.status(500).json({ message: "Error creating user", error });
        }
    } else {
        res.status(405).json({ message: "Method not allowed" });
    }
}
