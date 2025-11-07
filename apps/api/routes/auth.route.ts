import express from "express";
import type { Request, Response } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../config/auth";
import { requireAuth, optionalAuth } from "../middlewares/auth.middleware";

const router = express.Router();

/**
 * Get current user session
 */
router.get("/api/me", async (req: Request, res: Response) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        error: "Not authenticated",
        user: null,
      });
    }

    res.json({
      user: session.user,
      session: {
        id: session.session.id,
        expiresAt: session.session.expiresAt,
      },
    });
  } catch (error) {
    console.error("Error getting user session:", error);
    res.status(500).json({
      error: "Internal server error",
      message: "Failed to get user session",
    });
  }
});

/**
 * Protected route example
 */
router.get("/api/protected", requireAuth, (req: Request, res: Response) => {
  res.json({
    message: "This is a protected route",
    user: req.user,
  });
});

/**
 * Public route with optional auth
 */
router.get("/api/public", optionalAuth, (req: Request, res: Response) => {
  res.json({
    message: "This is a public route",
    user: req.user || null,
    authenticated: !!req.user,
  });
});

/**
 * Health check for Better Auth
 */
router.get("/api/auth/ok", (req: Request, res: Response) => {
  res.json({
    status: "ok",
    message: "Better Auth is working",
  });
});

export default router;
