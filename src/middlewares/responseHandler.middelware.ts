import { Request, Response, NextFunction } from "express";

export const responseHandler = (
  _: Request,
  res: Response,
  next: NextFunction
) => {
  res.success = ({ data = null, status = 200, message = null }) => {
    return res.status(status).json({
      success: true,
      message,
      data,
    });
  };

  res.error = ({ data = null, status = 500, message = null }) => {
    return res.status(status).json({
      success: false,
      message,
      data,
    });
  };

  next();
};
