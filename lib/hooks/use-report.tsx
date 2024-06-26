import { useSelector } from "react-redux";

// store
import { getOrders } from "../store/selectors/order";

const useReport = () => {
  const orders = useSelector(getOrders);

  const areOrdersNotEmpty = orders && orders?.length > 0;

  function getTotalSales() {
    const products = areOrdersNotEmpty
      ? orders.map((order) => order.productDetails)
      : [];
    const data = products.flatMap((product) => product);

    const totalSales = data.reduce(
      (sum, current) => sum + parseInt(current.total ?? ""),
      0
    );

    return totalSales;
  }

  function findTotalCustomers() {
    const uniqueCustomers = new Set<string>();

    if (areOrdersNotEmpty) {
      orders.forEach((order) => {
        uniqueCustomers.add(order.customerName);
      });
    }

    return uniqueCustomers.size;
  }

  function calculateSalesPerProduct() {
    const productSales: { name: string; sales: string }[] = [];
    const salesMap = new Map<string, number>();

    const products = areOrdersNotEmpty
      ? orders.map((order) => order.productDetails)
      : [];
    const data = products.flatMap((product) => product);

    data.forEach((order) => {
      if (order.product && order.status === "Confirmed" && order.total) {
        const productName = order.product.name;
        const orderTotal = parseFloat(order.total);

        if (salesMap.has(productName)) {
          salesMap.set(productName, salesMap.get(productName)! + orderTotal);
        } else {
          salesMap.set(productName, orderTotal);
        }
      }
    });

    salesMap.forEach((total, product) => {
      productSales.push({ name: product, sales: `${total}` });
    });

    return productSales;
  }

  return {
    totalOrders: areOrdersNotEmpty ? orders.length : 0,
    successfulOrders: areOrdersNotEmpty
      ? orders?.filter((order) => order.status === "Confirmed").length
      : 0,
    totalCustomers: findTotalCustomers(),
    sales: getTotalSales(),
    salesPerProduct: calculateSalesPerProduct(),
  };
};

export default useReport;
