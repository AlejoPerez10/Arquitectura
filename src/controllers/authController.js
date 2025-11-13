import * as authService from "@/services/authService";

export async function signupController(req, res) {
    try {
        const { name, lastName, email, password } = req.body;
        const { user, token } = await authService.signupService({ name, lastName, email, password });
        res.status(201).json({ message: "User created", user: { id: user._id, name, email }, token });
    } catch (err) {
        if (err.message === "USER_EXISTS") return res.status(400).json({ message: "User already exists" });
        res.status(500).json({ message: "Server error", error: err.message });
    }
}

export async function loginController(req, res) {
    try {
        const { email, password } = req.body;
        const { user, token } = await authService.loginService({ email, password });
        res.status(200).json({ message: "Login successful", user: { id: user._id, name: user.name, email }, token });
    } catch (err) {
        if (err.message === "USER_NOT_FOUND" || err.message === "INVALID_PASSWORD") {
        return res.status(400).json({ message: "Invalid credentials" });
        }
        res.status(500).json({ message: "Server error", error: err.message });
    }
}
