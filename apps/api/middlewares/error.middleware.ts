import type { NextFunction, Request, Response } from "express";

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Log the error details for debugging
  console.error(error);

  const isProduction = process.env.NODE_ENV === "production";

  res.status(500).json({
    message: "Internal Server Error",
    ...(isProduction ? {} : { error }),
  });
};
