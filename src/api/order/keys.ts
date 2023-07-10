export const orderKeys = {
  orderHistory: (
    userId: number,
    shopId: number,
    voucherId: string | null,
    orderStatusId: number | null,
    orderDate: string | null,
    pageSize: number
  ) =>
    [
      'AYAZayOrder',
      'GetOrderHistoryForAYAZay',
      userId,
      shopId,
      voucherId,
      orderStatusId,
      orderDate,
      pageSize,
    ] as const,
  orderDetail: (orderId: number) =>
    ['AYAZayOrder', 'GetOrderDetail', orderId] as const,
  voucher: (orderId: number) =>
    ['AYAZayOrder', 'GetPOSVoucher', orderId] as const,
  deliveryAddress: () => ['AYAZayOrder', 'GetDeliveryAddress'] as const,
  getNotificationBuyer: (pageSize: number) =>
    ['AYAZayOrder', 'GetNotificationBuyer', pageSize] as const,
  getOrderMessage: (orderId: number, pageNumber: number, pageSize: number) =>
    [
      'AYAZayOrder',
      'GetOrderMessageForAYAZay',
      orderId,
      pageNumber,
      pageSize,
    ] as const,
};
