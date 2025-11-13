import User from "@/models/User";
import bcrypt from "bcryptjs";
import { signToken } from "@/utils/tokenUtils";

export async function signupService({ name, lastName, email, password }) {
    const existing = await User.findOne({ email });
    if (existing) throw new Error("USER_EXISTS");

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, lastName, email, password: hashed });

    const token = signToken({ id: user._id, email: user.email });
    return { user, token };
    }

    export async function loginService({ email, password }) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("USER_NOT_FOUND");

    const ok = await bcrypt.compare(password, user.password);
    if (!ok) throw new Error("INVALID_PASSWORD");

    const token = signToken({ id: user._id, email: user.email });
    return { user, token };
}
