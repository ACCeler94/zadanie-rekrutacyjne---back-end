const filterOrdersByWorth = (orders, { minWorth, maxWorth }) => {
  if (minWorth && maxWorth) {
    const min = Number(minWorth);
    const max = Number(maxWorth);
    if (isNaN(min) || isNaN(max)) {
      throw new Error('minWorth and maxWorth must be valid numbers');
    }

    return orders.filter(order => order.orderWorth >= min && order.orderWorth <= max);
  }
  return orders;
};

export default filterOrdersByWorth;