interface ProductCardProps {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

const ProductCard = ({ name, price, description, image }: ProductCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={image} 
        alt={name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{name}</h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{description}</p>
        <p className="text-xl font-bold text-blue-600">${price.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default ProductCard; 