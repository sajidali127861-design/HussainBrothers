import { CURRENCY_SYMBOL } from '@/config/business';

export const formatPrice = (amount: number): string =>
  `${CURRENCY_SYMBOL} ${amount.toLocaleString('en-PK')}`;
