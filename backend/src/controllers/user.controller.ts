import { Request, Response, NextFunction } from 'express';
import prisma from '../config/database';

export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true, createdAt: true }
    });
    res.json({ success: true, data: users });
  } catch (error) {
    next(error);
  }
};

export const getUserStats = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [totalUsers, totalCustomers, totalAdmins, totalOrders] = await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: 'CUSTOMER' } }),
      prisma.user.count({ where: { role: 'ADMIN' } }),
      prisma.order.count()
    ]);
    
    res.json({
      success: true,
      data: { totalUsers, totalCustomers, totalAdmins, totalOrders }
    });
  } catch (error) {
    next(error);
  }
};