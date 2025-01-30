import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router-dom';
import { orderApi } from '../../services/api';

export const Order = () => {
    const [address, setAddress] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
    const { items, totalPrice } = useCartStore();
    const navigate = useNavigate();

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handleConfirmOrder = async () => {
        await orderApi.confirmOrder({shippingAddress: address});
        console.log('Order confirmed with address:', address);
        setIsDialogOpen(true); // Open the dialog
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
        navigate('/'); // Navigate to confirmation page after closing the dialog
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Confirm Your Order</h1>
            <h2 className="text-xl font-semibold mb-2">Items:</h2>
            <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200 mb-4">
                {items.map(item => (
                    <li key={item.productId._id} className="flex justify-between items-center p-4">
                        <div>
                            <h3 className="text-lg font-semibold">{item.productId.name}</h3>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <span className="text-lg font-medium">${(item.productId.price * item.quantity).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <h2 className="text-xl font-semibold mb-2">Total Price: ${totalPrice.toFixed(2)}</h2>
            <div className="mb-4">
                <label className="block text-gray-700 mb-2" htmlFor="address">Shipping Address:</label>
                <input
                    type="text"
                    id="address"
                    value={address}
                    onChange={handleAddressChange}
                    className="border border-gray-300 rounded-lg p-2 w-full"
                    placeholder="Enter your shipping address"
                />
            </div>
            <button 
                onClick={handleConfirmOrder} 
                className="mt-4 bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-600"
            >
                Confirm Order
            </button>

            {/* Dialog Box */}
            {isDialogOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg p-6 shadow-lg">
                        <h2 className="text-lg font-bold mb-4">Order Placed!</h2>
                        <p>Your order has been successfully placed.</p>
                        <button 
                            onClick={closeDialog} 
                            className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                        >
                            OK
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}