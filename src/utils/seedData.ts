import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export const sampleProducts = [
  {
    name: 'iPhone 15 Pro',
    description: 'The most advanced iPhone with A17 Pro chip, titanium design, and Action Button.',
    price: 999,
    originalPrice: 1199,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop'
    ],
    category: 'smartphone',
    brand: 'Apple',
    inStock: true,
    stockCount: 25,
    rating: 4.8,
    reviews: 1205,
    discount: 17,
    isNew: true,
    isBestseller: true,
    features: [
      'A17 Pro chip with 6-core GPU',
      'Pro camera system with 48MP',
      'Titanium design',
      'Action Button',
      'USB-C connector'
    ],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Chip': 'A17 Pro',
      'Camera': '48MP Main + 12MP Ultra Wide + 12MP Telephoto',
      'Storage': '128GB, 256GB, 512GB, 1TB',
      'Battery': 'Up to 23 hours video playback',
      'OS': 'iOS 17'
    },
    tags: ['iphone', 'apple', 'pro', 'titanium', 'a17'],
    deliveryInfo: {
      freeDelivery: true,
      estimatedDays: 1,
      expressDelivery: true
    },
    warranty: '1 year limited warranty',
    seller: 'Apple Store',
    highlights: [
      'Latest A17 Pro chip for ultimate performance',
      'Professional camera system',
      'Premium titanium build quality',
      'Free delivery in 1 day'
    ]
  },
  {
    name: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android phone with S Pen, 200MP camera, and AI-powered features.',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=500&h=500&fit=crop',
      'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop'
    ],
    category: 'smartphone',
    brand: 'Samsung',
    inStock: true,
    stockCount: 15,
    rating: 4.7,
    reviews: 892,
    discount: 8,
    isBestseller: true,
    features: [
      '200MP Pro camera with AI',
      'S Pen included',
      'Snapdragon 8 Gen 3',
      '6.8-inch Dynamic AMOLED 2X',
      'Galaxy AI features'
    ],
    specifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 8 Gen 3',
      'Camera': '200MP + 50MP + 12MP + 10MP',
      'RAM': '12GB',
      'Storage': '256GB, 512GB, 1TB',
      'Battery': '5000mAh with 45W fast charging',
      'OS': 'Android 14 with One UI 6.1'
    },
    tags: ['samsung', 'galaxy', 'ultra', 's-pen', 'android'],
    deliveryInfo: {
      freeDelivery: true,
      estimatedDays: 2,
      expressDelivery: true
    },
    warranty: '1 year manufacturer warranty',
    seller: 'Samsung Official',
    highlights: [
      'Revolutionary 200MP camera with AI',
      'Built-in S Pen for productivity',
      'Largest Galaxy screen ever',
      'Free shipping and returns'
    ]
  },
  {
    name: 'Google Pixel 8 Pro',
    description: 'Pure Android experience with exceptional camera and AI capabilities.',
    price: 899,
    originalPrice: 999,
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
    category: 'smartphone',
    brand: 'Google',
    inStock: true,
    stockCount: 30,
    rating: 4.6,
    reviews: 634,
    discount: 10,
    isNew: true,
    features: [
      'Google Tensor G3 chip',
      'Magic Eraser and AI features',
      'Pure Android 14',
      'Best-in-class camera',
      '7 years of updates'
    ],
    specifications: {
      'Display': '6.7-inch LTPO OLED',
      'Chip': 'Google Tensor G3',
      'Camera': '50MP + 48MP + 48MP',
      'RAM': '12GB',
      'Storage': '128GB, 256GB, 512GB',
      'Battery': '5050mAh with 30W charging',
      'OS': 'Android 14'
    },
    tags: ['google', 'pixel', 'android', 'camera', 'ai'],
    deliveryInfo: {
      freeDelivery: true,
      estimatedDays: 2,
      expressDelivery: false
    },
    warranty: '1 year limited warranty',
    seller: 'Google Store',
    highlights: [
      'Best Android camera with AI',
      '7 years of OS updates guaranteed',
      'Pure Google experience',
      'Advanced AI features'
    ]
  },
  {
    name: 'OnePlus 12',
    description: 'Flagship killer with Snapdragon 8 Gen 3 and fast charging technology.',
    price: 799,
    originalPrice: 899,
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=500&h=500&fit=crop',
    category: 'smartphone',
    brand: 'OnePlus',
    inStock: true,
    stockCount: 20,
    rating: 4.5,
    reviews: 421,
    discount: 11,
    features: [
      'Snapdragon 8 Gen 3',
      '100W SUPERVOOC charging',
      'Hasselblad camera',
      'OxygenOS 14',
      '120Hz ProXDR display'
    ],
    specifications: {
      'Display': '6.82-inch LTPO3 AMOLED',
      'Processor': 'Snapdragon 8 Gen 3',
      'Camera': '50MP + 64MP + 48MP',
      'RAM': '12GB/16GB',
      'Storage': '256GB, 512GB',
      'Battery': '5400mAh with 100W charging',
      'OS': 'OxygenOS 14 (Android 14)'
    },
    tags: ['oneplus', 'flagship', 'fast-charging', 'hasselblad'],
    deliveryInfo: {
      freeDelivery: true,
      estimatedDays: 3,
      expressDelivery: true
    },
    warranty: '1 year manufacturer warranty',
    seller: 'OnePlus Official',
    highlights: [
      'Ultra-fast 100W charging',
      'Flagship performance at great price',
      'Hasselblad partnership camera',
      'Premium build quality'
    ]
  },
  {
    name: 'iPhone 14',
    description: 'Reliable iPhone with advanced dual-camera system and all-day battery life.',
    price: 699,
    originalPrice: 799,
    image: 'https://images.unsplash.com/photo-1663499482523-1c0c1bae4ce1?w=500&h=500&fit=crop',
    category: 'smartphone',
    brand: 'Apple',
    inStock: true,
    stockCount: 40,
    rating: 4.7,
    reviews: 1583,
    discount: 13,
    features: [
      'A15 Bionic chip',
      'Advanced dual-camera system',
      'Crash Detection',
      'All-day battery life',
      'Ceramic Shield front'
    ],
    specifications: {
      'Display': '6.1-inch Super Retina XDR',
      'Chip': 'A15 Bionic',
      'Camera': '12MP Main + 12MP Ultra Wide',
      'Storage': '128GB, 256GB, 512GB',
      'Battery': 'Up to 20 hours video playback',
      'OS': 'iOS 17'
    },
    tags: ['iphone', 'apple', 'reliable', 'a15'],
    deliveryInfo: {
      freeDelivery: true,
      estimatedDays: 1,
      expressDelivery: true
    },
    warranty: '1 year limited warranty',
    seller: 'Apple Store',
    highlights: [
      'Proven A15 Bionic performance',
      'Great value for iPhone experience',
      'Excellent camera quality',
      'Long software support'
    ]
  },
  {
    name: 'Samsung Galaxy A54',
    description: 'Mid-range smartphone with excellent camera and sleek design.',
    price: 449,
    originalPrice: 499,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=500&h=500&fit=crop',
    category: 'smartphone',
    brand: 'Samsung',
    inStock: true,
    stockCount: 50,
    rating: 4.4,
    reviews: 756,
    discount: 10,
    features: [
      'Exynos 1380 processor',
      'Triple camera setup',
      '120Hz Super AMOLED',
      '5000mAh battery',
      'Premium design'
    ],
    specifications: {
      'Display': '6.4-inch Super AMOLED',
      'Processor': 'Exynos 1380',
      'Camera': '50MP + 12MP + 5MP',
      'RAM': '8GB',
      'Storage': '128GB, 256GB',
      'Battery': '5000mAh with 25W charging',
      'OS': 'Android 13 with One UI 5.1'
    },
    tags: ['samsung', 'galaxy', 'mid-range', 'amoled'],
    deliveryInfo: {
      freeDelivery: true,
      estimatedDays: 2,
      expressDelivery: false
    },
    warranty: '1 year manufacturer warranty',
    seller: 'Samsung Official',
    highlights: [
      'Best mid-range camera experience',
      'Premium AMOLED display',
      'All-day battery life',
      'Great value for money'
    ]
  },
  {
    name: 'AirPods Pro (2nd Gen)',
    description: 'Wireless earbuds with active noise cancellation and spatial audio.',
    price: 249,
    originalPrice: 279,
    image: 'https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=500&h=500&fit=crop',
    category: 'accessory',
    brand: 'Apple',
    inStock: true,
    stockCount: 35,
    rating: 4.8,
    reviews: 2341,
    discount: 11,
    isBestseller: true,
    features: [
      'Active Noise Cancellation',
      'Spatial Audio',
      'H2 chip',
      'Up to 6 hours listening',
      'MagSafe charging case'
    ],
    specifications: {
      'Chip': 'Apple H2',
      'Battery Life': 'Up to 6 hours (with ANC)',
      'Case Battery': 'Up to 30 hours total',
      'Connectivity': 'Bluetooth 5.3',
      'Water Resistance': 'IPX4',
      'Controls': 'Touch control'
    },
    tags: ['airpods', 'apple', 'wireless', 'noise-cancellation'],
    deliveryInfo: {
      freeDelivery: true,
      estimatedDays: 1,
      expressDelivery: true
    },
    warranty: '1 year limited warranty',
    seller: 'Apple Store',
    highlights: [
      'Industry-leading noise cancellation',
      'Immersive spatial audio',
      'All-day battery with case',
      'Seamless Apple ecosystem integration'
    ]
  },
  {
    name: 'Samsung Galaxy Buds2 Pro',
    description: 'Premium wireless earbuds with intelligent ANC and 360 Audio.',
    price: 199,
    originalPrice: 229,
    image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop',
    category: 'accessory',
    brand: 'Samsung',
    inStock: true,
    stockCount: 25,
    rating: 4.5,
    reviews: 987,
    discount: 13,
    features: [
      'Intelligent Active Noise Cancellation',
      '360 Audio',
      'Hi-Fi sound quality',
      'IPX7 water resistance',
      'Voice detection'
    ],
    specifications: {
      'Drivers': '10mm woofer + 5.3mm tweeter',
      'Battery Life': 'Up to 5 hours (with ANC)',
      'Case Battery': 'Up to 18 hours total',
      'Connectivity': 'Bluetooth 5.3',
      'Water Resistance': 'IPX7',
      'Controls': 'Touch control'
    },
    tags: ['samsung', 'galaxy-buds', 'wireless', 'pro'],
    deliveryInfo: {
      freeDelivery: true,
      estimatedDays: 2,
      expressDelivery: true
    },
    warranty: '1 year manufacturer warranty',
    seller: 'Samsung Official',
    highlights: [
      'Hi-Fi sound with dual drivers',
      'Intelligent noise cancellation',
      'IPX7 water resistance',
      'Perfect for Samsung devices'
    ]
  }
];

export const addSampleProducts = async () => {
  try {
    console.log('Adding sample products to Firestore...');
    const promises = sampleProducts.map(product => 
      addDoc(collection(db, 'products'), product)
    );
    
    await Promise.all(promises);
    console.log('Sample products added successfully!');
  } catch (error) {
    console.error('Error adding sample products:', error);
    throw error;
  }
};