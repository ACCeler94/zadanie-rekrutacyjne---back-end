const deduplicateOrders = (existingOrders, newOrders) => {
  const orderMap = new Map();

  existingOrders.forEach(order => orderMap.set(order.orderID, order));
  newOrders.forEach(order => orderMap.set(order.orderID, order));

  // Convert back to array
  return Array.from(orderMap.values());
};

export default deduplicateOrders;