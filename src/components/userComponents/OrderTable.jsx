import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { markAsDelivered } from '@/redux/features/orders/orderSlice';

const OrderTable = ({ orders }) => {
  const role = useSelector((state) => state.users.user.userInfo.role);
  const dispatch = useDispatch();

  const handleDelivered = (id) => {
    dispatch(markAsDelivered(id))
      .unwrap()
      .then((res) => toast.success(res.message || "Successfully marked as delivered", { duration: 1000 }))
      .catch((err) => toast.error(err, { duration: 1000 }));
  };

  return (
    <div className="overflow-x-auto">
      {orders?.length > 0 ? (
        <table className="w-full">
          <thead>
            <tr>
              <td className="p-2">IMAGE</td>
              <td className="p-2">ID</td>
              <td className="p-2">DATE</td>
              <td className="p-2">TOTAL</td>
              <td className="p-2">PAID</td>
              <td className="p-2">DELIVERED</td>
              <td className="p-2"></td>
            </tr>
          </thead>

          <tbody>
            {orders &&
              orders.map((order) => (
                <tr key={order._id}>
                  <img
                    src={order.orderItems[0].image?.url}
                    alt={order.user}
                    className="w-[6rem] mb-5"
                  />

                  <td className="p-2">{order._id}</td>
                  <td className="p-2">{order.createdAt.substring(0, 10)}</td>
                  <td className="p-2">₹ {order.totalPrice}</td>

                  <td className="p-2">
                    {order.isPaid ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-orange-500 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>

                  <td className="px-2 py-2">
                    {order.isDelivered ? (
                      <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                        Completed
                      </p>
                    ) : (
                      <p className="p-1 text-center bg-orange-500 w-[6rem] rounded-full">
                        Pending
                      </p>
                    )}
                  </td>

                  <td className="px-2 py-2">
                    <Link to={`/order-details/${order._id}`}>
                      <Button className="w-28">View Details</Button>
                    </Link>
                  </td>
                  {role === "admin" && order.isDelivered === false && (
                    <td className="px-2 py-2">
                      <Button
                        className="w-32"
                        onClick={() => handleDelivered(order._id)}
                      >
                        Mark As Delivered
                      </Button>
                    </td>
                  )}
                </tr>
              ))}
          </tbody>
        </table>
      ) : (
        <div className="my-12 grid place-items-center px-2 md:my-24 md:px-0">
          <div className="lg:flex lg:items-center lg:space-x-10">
            <img
              src="https://res.cloudinary.com/freestyle07/image/upload/v1718628757/collecting-concept-illustration_elzdbi.png"
              alt="question-mark"
              className="h-[300px] w-auto"
            />
          </div>
          <h1 className="mt-6 text-lg font-semibold]">No Orders</h1>
        </div>
      )}
    </div>
  );
};

export default OrderTable;