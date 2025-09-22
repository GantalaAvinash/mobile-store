import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc, writeBatch } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { useCart } from '../contexts/CartContext';
import type { Product } from '../types';
import { Star, ShoppingCart, Search, Filter, Loader, Plus, Truck, Shield, Zap } from 'lucide-react';
import toast from 'react-hot-toast';
import { sampleProducts } from '../utils/seedData';

// Helper functions for enhanced product display
const calculateDiscount = (originalPrice: number, currentPrice: number): number => {
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};

const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

  const getDeliveryText = (deliveryInfo?: { estimatedDays: number; freeDelivery: boolean }): string => {
  if (!deliveryInfo) return 'Standard delivery';
  const days = deliveryInfo.estimatedDays;
  const freeText = deliveryInfo.freeDelivery ? 'FREE' : 'Paid';
  return `${freeText} delivery in ${days} ${days === 1 ? 'day' : 'days'}`;
};

const Dashboard: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addToCart } = useCart();
  const navigate = useNavigate();

  // Fetch products from Firestore
  const fetchProducts = async () => {
    try {
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productList);
    } catch (error) {
      console.error('Error fetching products:', error);
      toast.error('Failed to load products');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search and category
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories - filter out undefined/null values
  const categories = ['all', ...Array.from(new Set(products.map(p => p.category).filter(Boolean)))];

  const addSampleProducts = async () => {
    try {
      setLoading(true);
      const batch = writeBatch(db);
      
      sampleProducts.forEach((product) => {
        const docRef = doc(collection(db, 'products'));
        batch.set(docRef, product);
      });
      
      await batch.commit();
      toast.success('Sample products added successfully!');
      fetchProducts();
    } catch (error) {
      console.error('Error adding sample products:', error);
      toast.error('Failed to add sample products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSampleData = async () => {
    try {
      await addSampleProducts();
      toast.success('Sample products added successfully!');
      // Refresh the products list
      const productsCollection = collection(db, 'products');
      const productSnapshot = await getDocs(productsCollection);
      const productList = productSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Product[];
      setProducts(productList);
    } catch (error) {
      console.error('Error adding sample products:', error);
      toast.error('Failed to add sample products');
    }
  };

  const handleAddToCart = (product: Product) => {
    if (!product.inStock) {
      toast.error('Product is out of stock');
      return;
    }
    addToCart(product);
    toast.success(`${product.name} added to cart`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Mobile Store</h1>
              <p className="text-gray-600 mt-1">Discover the latest smartphones and accessories</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              {/* Add Sample Products Button */}
              {/* <button
                onClick={handleAddSampleData}
                disabled={loading}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                {loading ? 'Adding...' : 'Add Sample Products'}
              </button> */}
              
              {/* Search Bar */}
              <div className="flex-1 max-w-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-gray-500" />
            <span className="text-sm font-medium text-gray-700">Filter by category:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {category && typeof category === 'string' 
                  ? category.charAt(0).toUpperCase() + category.slice(1)
                  : category
                }
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            {products.length === 0 ? (
              <>
                <p className="text-gray-500 text-lg mb-4">No products in the store</p>
                <button
                  onClick={handleAddSampleData}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <Plus className="h-5 w-5" />
                  Add Sample Products
                </button>
              </>
            ) : (
              <>
                <p className="text-gray-500 text-lg">No products found</p>
                <p className="text-gray-400 mt-2">Try adjusting your search or filter criteria</p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300 cursor-pointer"
              >
                <div className="aspect-square overflow-hidden bg-gray-100 relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-2 left-2">
                    <span className="text-xs bg-black/70 text-white px-2 py-1 rounded">
                      {product.category}
                    </span>
                  </div>
                  {/* Bestseller Badge */}
                  {product.rating && product.rating >= 4.7 && (
                    <div className="absolute top-2 right-2">
                      <span className="text-xs bg-orange-500 text-white px-2 py-1 rounded flex items-center gap-1">
                        <Star className="h-3 w-3 fill-current" />
                        Bestseller
                      </span>
                    </div>
                  )}
                </div>
                
                <div className="p-4">
                  {/* Brand and Stock Badge */}
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      {product.brand && (
                        <span className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                          {product.brand}
                        </span>
                      )}
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {product.name}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-1">
                      {!product.inStock && (
                        <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                          Out of Stock
                        </span>
                      )}
                      {product.discount && product.discount > 0 && (
                        <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                          {product.discount}% OFF
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  
                  {/* Highlights */}
                  {product.highlights && product.highlights.length > 0 && (
                    <div className="mb-3">
                      <ul className="text-xs text-gray-600 space-y-1">
                        {product.highlights.slice(0, 2).map((highlight, idx) => (
                          <li key={idx} className="flex items-center gap-1">
                            <Zap className="h-3 w-3 text-blue-500 flex-shrink-0" />
                            {highlight}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Rating */}
                  {product.rating && (
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews || 0} reviews)
                      </span>
                    </div>
                  )}
                  
                  {/* Pricing */}
                  <div className="mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary-600">
                        {formatCurrency(product.price)}
                      </span>
                      {product.originalPrice && product.originalPrice > product.price && (
                        <div className="flex items-center gap-1">
                          <span className="text-sm text-gray-500 line-through">
                            {formatCurrency(product.originalPrice)}
                          </span>
                          <span className="text-sm text-green-600 font-medium">
                            ({calculateDiscount(product.originalPrice, product.price)}% off)
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {/* Delivery Info */}
                  {product.deliveryInfo && (
                    <div className="flex items-center gap-1 mb-3 text-xs text-gray-600">
                      <Truck className="h-3 w-3" />
                      {getDeliveryText(product.deliveryInfo)}
                    </div>
                  )}
                  
                  {/* Stock Count */}
                  {product.stockCount && product.stockCount < 10 && product.inStock && (
                    <div className="mb-3">
                      <span className="text-xs text-orange-600 font-medium">
                        Only {product.stockCount} left in stock!
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      {product.warranty && (
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Shield className="h-3 w-3" />
                          {product.warranty}
                        </div>
                      )}
                    </div>
                    
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddToCart(product);
                      }}
                      disabled={!product.inStock}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        product.inStock
                          ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-2 focus:ring-primary-500'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;