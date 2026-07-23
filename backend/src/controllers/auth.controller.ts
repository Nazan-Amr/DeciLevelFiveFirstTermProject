import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import passport from 'passport';

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password, name } = req.body;
    const result = await authService.register(email, password, name);
    res.status(201).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email, password);
    res.json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await authService.getCurrentUser((req as any).user.userId);
    res.json({ success: true, data: user });
  } catch (error) {
    next(error);
  }
};

export const googleCallback = (req: Request, res: Response) => {
  const user = req.user as any;
  const token = user.token;
  res.redirect(`${process.env.FRONTEND_URL}/login?token=${token}`);
};