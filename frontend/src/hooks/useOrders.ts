import { useState, useEffect, useCallback } from 'react';
import { Order } from '../types';
import { getOrders, createOrder, updateOrderStatus } from '../api/order.api';

export const useOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchOrders = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await getOrders();
      setOrders(data.data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const placeOrder = async () => {
    const { data } = await createOrder();
    await fetchOrders();
    return data.data;
  };

  const updateStatus = async (id: string, status: string) => {
    await updateOrderStatus(id, status);
    await fetchOrders();
  };

  return { orders, isLoading, placeOrder, updateStatus, fetchOrders };
};