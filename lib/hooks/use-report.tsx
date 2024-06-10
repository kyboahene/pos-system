import { useSelector } from "react-redux";
import { getOrders } from "../store/selectors/order";

const useReport = () => {
  const orders = useSelector(getOrders);

  function getTotalSales() {
    const products = orders.map((order) => order.productDetails);
    const data = products.flatMap((product) => product);

    const totalSales = data.reduce(
      (sum, current) => sum + parseInt(current.total ?? ""),
      0
    );

    return totalSales;
  }

  function findTotalCustomers() {
    const uniqueCustomers = new Set<string>();

    orders.forEach((order) => {
      uniqueCustomers.add(order.customerName);
    });

    return uniqueCustomers.size;
  }

  return {
    totalOrders: orders?.length,
    successfulOrders: orders.filter((order) => order.status === "Confirmed")
      ?.length,
    totalCustomers: findTotalCustomers(),
    sales: getTotalSales(),
  };
};

export default useReport;
