import { Request, Response, NextFunction } from 'express';
import * as cartService from '../services/cart.service';

export const getCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = await cartService.getCart((req as any).user.id);
    res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

export const addToCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { productId, quantity } = req.body;
    const item = await cartService.addToCart((req as any).user.id, productId, quantity || 1);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const updateCartItem = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const item = await cartService.updateCartItem(req.params.id, parseInt(req.body.quantity));
    res.json({ success: true, data: item });
  } catch (error) {
    next(error);
  }
};

export const removeFromCart = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await cartService.removeFromCart(req.params.id);
    res.json({ success: true, message: 'Item removed' });
  } catch (error) {
    next(error);
  }
};