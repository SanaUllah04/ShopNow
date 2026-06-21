// Mock data to replace MongoDB dependencies
// This allows the app to run without database connections

export const mockProducts = [
  {
    _id: "1",
    name: "Ultra26 Pro",
    price: 999,
    image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?q=80&w=600&auto=format&fit=crop",
    description: "The ultimate flagship smartphone with cutting-edge technology. Features a 6.9-inch OLED display, 108MP camera system, and all-day battery life.",
    category: "Smartphones",
    stock: 50,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "2",
    name: "Ultra26 Lite",
    price: 699,
    image: "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=600&auto=format&fit=crop",
    description: "Premium features at an accessible price point. Perfect balance of performance and value.",
    category: "Smartphones",
    stock: 100,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "3",
    name: "Ultra26 Ultra",
    price: 1299,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=600&auto=format&fit=crop",
    description: "The most advanced smartphone ever created. Titanium build, 2000 nits brightness, and pro-grade camera system.",
    category: "Smartphones",
    stock: 25,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "4",
    name: "Ultra26 Mini",
    price: 549,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=600&auto=format&fit=crop",
    description: "Compact power in your pocket. All the features you love in a smaller form factor.",
    category: "Smartphones",
    stock: 75,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "5",
    name: "Ultra26 Watch",
    price: 399,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=600&auto=format&fit=crop",
    description: "Advanced smartwatch with health monitoring, GPS, and seamless phone integration.",
    category: "Wearables",
    stock: 60,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "6",
    name: "Ultra26 Buds Pro",
    price: 249,
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=600&auto=format&fit=crop",
    description: "Premium wireless earbuds with active noise cancellation and spatial audio.",
    category: "Audio",
    stock: 120,
    featured: true,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "7",
    name: "Ultra26 Charger",
    price: 79,
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600&auto=format&fit=crop",
    description: "Fast charging adapter with 65W output for rapid power delivery.",
    category: "Accessories",
    stock: 200,
    featured: false,
    createdAt: new Date().toISOString(),
  },
  {
    _id: "8",
    name: "Ultra26 Case",
    price: 49,
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=600&auto=format&fit=crop",
    description: "Premium protective case with military-grade drop protection.",
    category: "Accessories",
    stock: 150,
    featured: false,
    createdAt: new Date().toISOString(),
  },
];

export const mockOrders = [
  {
    _id: "order1",
    items: [{ _id: "1", name: "Ultra26 Pro", price: 999, qty: 1, image: mockProducts[0].image }],
    total: 999,
    status: "Delivered",
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    _id: "order2",
    items: [{ _id: "5", name: "Ultra26 Watch", price: 399, qty: 2, image: mockProducts[4].image }],
    total: 798,
    status: "Processing",
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

export const mockUsers = [
  {
    _id: "user1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin",
  },
  {
    _id: "user2",
    name: "John Doe",
    email: "john@example.com",
    role: "user",
  },
];

// Helper functions to simulate database operations
export const mockDb = {
  products: {
    find: (filter: any = {}) => {
      let results = [...mockProducts];
      if (filter.name?.$regex) {
        const regex = new RegExp(filter.name.$regex, filter.name.$options || 'i');
        results = results.filter(p => regex.test(p.name));
      }
      if (filter.category?.$regex) {
        const regex = new RegExp(filter.category.$regex, filter.category.$options || 'i');
        results = results.filter(p => regex.test(p.category));
      }
      if (filter.featured !== undefined) {
        results = results.filter(p => p.featured === filter.featured);
      }
      return results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    },
    findById: (id: string) => mockProducts.find(p => p._id === id),
    create: (data: any) => {
      const newProduct = {
        _id: String(mockProducts.length + 1),
        ...data,
        createdAt: new Date().toISOString(),
      };
      mockProducts.push(newProduct);
      return newProduct;
    },
    updateById: (id: string, data: any) => {
      const index = mockProducts.findIndex(p => p._id === id);
      if (index !== -1) {
        mockProducts[index] = { ...mockProducts[index], ...data };
        return mockProducts[index];
      }
      return null;
    },
    deleteById: (id: string) => {
      const index = mockProducts.findIndex(p => p._id === id);
      if (index !== -1) {
        mockProducts.splice(index, 1);
        return true;
      }
      return false;
    },
    countDocuments: (filter: any = {}) => mockDb.products.find(filter).length,
  },
  orders: {
    find: () => [...mockOrders],
    create: (data: any) => {
      const newOrder = {
        _id: `order${mockOrders.length + 1}`,
        ...data,
        createdAt: new Date().toISOString(),
      };
      mockOrders.push(newOrder);
      return newOrder;
    },
    countDocuments: () => mockOrders.length,
  },
  users: {
    find: (filter: any = {}) => {
      let results = [...mockUsers];
      if (filter.role) {
        results = results.filter(u => u.role === filter.role);
      }
      return results;
    },
    countDocuments: (filter: any = {}) => mockDb.users.find(filter).length,
  },
};
