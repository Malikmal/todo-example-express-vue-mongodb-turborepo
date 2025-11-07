import type { Request, Response, NextFunction } from "express";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../config/auth";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        name: string;
        emailVerified: boolean;
        image?: string | null;
        createdAt: Date;
        updatedAt: Date;
      };
    }
  }
}

/**
 * Middleware to check if user is authenticated
 */
export async function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (!session) {
      return res.status(401).json({
        error: "Unauthorized",
        message: "Authentication required",
      });
    }

    req.user = session.user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error);
    return res.status(500).json({
      error: "Internal Server Error",
      message: "Authentication check failed",
    });
  }
}

/**
 * Middleware to optionally get user session (doesn't require auth)
 */
export async function optionalAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    });

    if (session) {
      req.user = session.user;
    }

    next();
  } catch (error) {
    console.error("Optional auth middleware error:", error);
    // Continue without setting user
    next();
  }
}
