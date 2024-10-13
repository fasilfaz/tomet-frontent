import React from 'react'
import { Link } from 'react-router-dom'

const OrderDetailTable = ({ order }) => {
    return (
        <table className="w-full">
            <thead className="border-b-2">
                <tr>
                    <th className="p-2">Image</th>
                    <th className="p-2">Product</th>
                    <th className="p-2 text-center">Quantity</th>
                    <th className="p-2">Unit Price</th>
                    <th className="p-2">Total</th>
                </tr>
            </thead>
            <tbody>
                {order && order.orderItems && order.orderItems.map((item, index) => (
                    <tr key={index}>
                        <td className="p-2">
                            <img
                                src={item.image?.url}
                                alt={item.name}
                                className="w-16 h-16 object-cover"
                            />
                        </td>
                        <td className="p-2 text-center">
                            <Link to={`/product/${item.product}`}>{item.name}</Link>
                        </td>
                        <td className="p-2 text-center">{item.qty}</td>
                        <td className="p-2 text-center">{item.price}</td>
                        <td className="p-2 text-center">
                        ₹ {(item.qty * item.price).toFixed(0)}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default OrderDetailTable
