import { useEffect } from 'react';
import { useCartStore } from '../../store/cartStore';
import { useNavigate } from 'react-router-dom';

export const Cart = () => {
    const items = useCartStore((state) => state.items);
    const totalPrice = useCartStore((state) => state.totalPrice);
    const fetchCart = useCartStore((state) => state.fetchCart);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleProceedToOrder = () => {
        navigate('/order');
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Cart</h1>
            <ul className="bg-white shadow-md rounded-lg divide-y divide-gray-200">
                {items.map(item => (
                    <li key={item.productId._id} className="flex justify-between items-center p-4">
                        <div>
                            <h2 className="text-lg font-semibold">{item.productId.name}</h2>
                            <p className="text-gray-600">Quantity: {item.quantity}</p>
                        </div>
                        <span className="text-lg font-medium">${(item.productId.price * item.quantity).toFixed(2)}</span>
                    </li>
                ))}
            </ul>
            <h2 className="text-xl font-bold mt-4">Total Price: ${totalPrice.toFixed(2)}</h2>
            <button 
                onClick={handleProceedToOrder} 
                className="mt-4 bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
            >
                Proceed to Order
            </button>
        </div>
    );
}