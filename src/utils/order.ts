import { ORDER_API_URL } from '@/config/business';
import type { CartItem, CustomerDetails, OrderApiResponse, OrderPayload } from '@/types';

export function generateOrderReference(): string {
  const num = Math.floor(1000 + Math.random() * 9000);
  return `HB-${num}`;
}

export function buildOrderPayload(
  orderRef: string,
  customer: CustomerDetails,
  items: CartItem[],
  subtotal: number
): OrderPayload {
  return {
    orderRef,
    date: new Date().toISOString(),
    customer,
    items: items.map((item) => ({
      productName: item.name,
      weight: item.weight,
      quantity: item.quantity,
      price: item.price,
    })),
    subtotal,
    total: subtotal,
  };
}

export async function submitOrder(payload: OrderPayload): Promise<OrderApiResponse> {
  if (!ORDER_API_URL) {
    return {
      success: false,
      message:
        'Order system is not configured yet (missing VITE_ORDER_API_URL). Please contact the site owner.',
    };
  }

  const response = await fetch(ORDER_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    return {
      success: false,
      message: "We couldn't complete your order right now. Please try again.",
    };
  }

  const data = (await response.json()) as OrderApiResponse;
  return data;
}