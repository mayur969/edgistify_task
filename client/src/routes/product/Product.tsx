import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProductStore } from '../../store/productStore';
import authStore from '../../store/authStore';
import { useCartStore } from '../../store/cartStore';

export const Product = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const isLoggedIn = authStore((state) => state.isLoggedIn);
    const { addToCart } = useCartStore();
    const { getProductById } = useProductStore();
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        if (id) {
            const productData = getProductById(id);
            setProduct(productData);
        }
    }, [id, getProductById]);

    const handleQuantityChange = (change: number) => {
        setQuantity(prev => Math.max(1, prev + change));
    };

    const handleAddToCart = async () => {
        if (!isLoggedIn) {
            navigate('/login', { state: { from: `/product/${id}` } });
            return;
        }

        try {
            await addToCart({
                    productId: id as string,
                    quantity: quantity
            });
            navigate('/cart');
        } catch (error) {
            console.error('Failed to add item to cart:', error);
        }
    };

    if (!product) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="rounded-lg overflow-hidden">
                        <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-auto object-cover"
                        />
                    </div>
                    
                    <div className="flex flex-col">
                        <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                        <p className="text-xl font-semibold mb-4">${product.price}</p>
                        <p className="text-gray-600 mb-6">{product.description}</p>
                        
                        <div className="flex items-center space-x-4 mb-6">
                            <button 
                                onClick={() => handleQuantityChange(-1)}
                                className="px-3 py-1 border rounded-md"
                            >
                                -
                            </button>
                            <span className="text-xl">{quantity}</span>
                            <button 
                                onClick={() => handleQuantityChange(1)}
                                className="px-3 py-1 border rounded-md"
                            >
                                +
                            </button>
                        </div>
                        
                        <button 
                            onClick={handleAddToCart}
                            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};