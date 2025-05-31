const formatData = (orders) => {
  const data = orders.map((order) => {
    const orderWorthCents =
      Math.round(order.orderDetails.payments.orderBaseCurrency.orderProductsCost * 100) + // Converted to cents/grosze to avoid issues with directly adding decimals
      Math.round(order.orderDetails.payments.orderBaseCurrency.orderDeliveryCost * 100) +
      Math.round(order.orderDetails.payments.orderBaseCurrency.orderPayformCost * 100) +
      Math.round(order.orderDetails.payments.orderBaseCurrency.orderInsuranceCost * 100);
    return {
      orderID: order.orderSerialNumber,
      products: order.orderDetails.productsResults.map((product) => ({ productID: product.productId, quantity: product.productQuantity })),
      orderWorth: orderWorthCents / 100 // Convert back to main currency format
    }
  })

  return data;
}

export default formatData;