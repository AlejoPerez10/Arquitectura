/*
1- Toma el token del header Authorization.
2- Lo verifica usando tu verifyToken.
3- Si es válido, añade req.user = decoded y llama al handler original (la función de la ruta).
4- Si no es válido o no hay token, devuelve 401 Unauthorized.
*/

import { verifyToken } from "@/utils/tokenUtils";

export default function authMiddleware(handler) {
    return async (req, res) => {
        const auth = req.headers.authorization;
        if (!auth) return res.status(401).json({ message: "No token" });

        const token = auth.replace("Bearer ", "");
        try {
        const decoded = verifyToken(token);
        req.user = decoded;
        return handler(req, res);
        } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
        }
    };
}
