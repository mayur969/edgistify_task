import { useEffect, useRef, useState } from 'react';
import { useProductStore } from '../../store/productStore';
import ProductCard from '../../components/ProductCard';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
    const { products, fetchProducts, hasMore, loading } = useProductStore();
    const [page, setPage] = useState(1);
    const observer = useRef<IntersectionObserver | null>(null);
    const lastProductRef = useRef<HTMLDivElement | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProducts(page);
    }, [page]);
    
    useEffect(() => {
        if (loading) return;
        
        if (observer.current) {
            observer.current.disconnect();
        }
        
        console.log(products)
        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPage(prev => prev + 1);
            }
        });

        if (lastProductRef.current) {
            observer.current.observe(lastProductRef.current);
        }
    }, [loading, hasMore]);

    const handleProductClick = (productId: string) => {
        navigate(`/product/${productId}`);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-6">Products</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {
                products.map((product, index) => (
                    <div
                        key={product._id}
                        ref={index === products.length - 1 ? lastProductRef : null}
                        onClick={() => handleProductClick(product._id)}
                        className="cursor-pointer"
                    >
                        <ProductCard {...product} />
                    </div>
                ))}
            </div>
            
            {loading && (
                <div className="flex justify-center my-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
                </div>
            )}
        </div>
    );
};
