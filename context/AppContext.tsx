'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Types
interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  city: string;
  isAdmin: boolean;
  createdAt: string;
}

interface Merchant {
  id: string;
  ownerName: string;
  storeName: string;
  category: string;
  city: string;
  email: string;
  phone: string;
  gstin?: string;
  address: string;
  offerDetails: string;
  bankDetails: string;
  isApproved: boolean;
  isActive: boolean;
  images: string[];
  createdAt: string;
  rating: number;
  totalOffers: number;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  isActive: boolean;
}

interface Card {
  id: string;
  userId: string;
  serviceNumber: string;
  plan: string;
  city: string;
  price: number;
  status: 'pending' | 'active' | 'expired' | 'cancelled';
  purchasedAt: string;
  expiresAt: string;
  activatedAt?: string;
}

interface ActivationRequest {
  id: string;
  serviceNumber: string;
  cardId: string;
  userId: string;
  status: 'pending' | 'under_review' | 'active' | 'rejected';
  supportingInfo: string;
  submittedAt: string;
  processedAt?: string;
  processedBy?: string;
}

interface ContactForm {
  id: string;
  name: string;
  email: string;
  message: string;
  submittedAt: string;
}

interface AppState {
  currentUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  users: User[];
  merchants: Merchant[];
  pendingMerchants: Merchant[];
  categories: Category[];
  cards: Card[];
  activationRequests: ActivationRequest[];
  contactForms: ContactForm[];
  loading: boolean;
  selectedCity: string;
  selectedCategory: string;
}

type AppAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ADMIN'; payload: boolean }
  | { type: 'ADD_USER'; payload: User }
  | { type: 'ADD_MERCHANT'; payload: Merchant }
  | { type: 'APPROVE_MERCHANT'; payload: string }
  | { type: 'REJECT_MERCHANT'; payload: string }
  | { type: 'UPDATE_MERCHANT'; payload: { id: string; data: Partial<Merchant> } }
  | { type: 'DELETE_MERCHANT'; payload: string }
  | { type: 'ADD_CATEGORY'; payload: Category }
  | { type: 'UPDATE_CATEGORY'; payload: { id: string; data: Partial<Category> } }
  | { type: 'DELETE_CATEGORY'; payload: string }
  | { type: 'ADD_CARD'; payload: Card }
  | { type: 'UPDATE_CARD'; payload: { id: string; data: Partial<Card> } }
  | { type: 'ADD_ACTIVATION_REQUEST'; payload: ActivationRequest }
  | { type: 'UPDATE_ACTIVATION_REQUEST'; payload: { id: string; data: Partial<ActivationRequest> } }
  | { type: 'ADD_CONTACT_FORM'; payload: ContactForm }
  | { type: 'SET_SELECTED_CITY'; payload: string }
  | { type: 'SET_SELECTED_CATEGORY'; payload: string }
  | { type: 'INIT_DATA'; payload: Partial<AppState> };

// Initial mock data
const initialMockData = {
  users: [
    {
      id: '1',
      email: 'john@example.com',
      name: 'John Doe',
      phone: '+91 9876543210',
      city: 'Mumbai',
      isAdmin: false,
      createdAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      email: 'admin@citywitty.com',
      name: 'Admin User',
      phone: '+91 9876543211',
      city: 'All Cities',
      isAdmin: true,
      createdAt: '2024-01-01T10:00:00Z'
    }
  ],
  merchants: [
    {
      id: '1',
      ownerName: 'Rajesh Kumar',
      storeName: 'FitZone Gym',
      category: 'Gym',
      city: 'Mumbai',
      email: 'rajesh@fitzone.com',
      phone: '+91 9876543212',
      address: '123 Fitness Street, Bandra West, Mumbai 400050',
      offerDetails: '20% off on monthly membership + Free personal training session',
      bankDetails: 'HDFC Bank ****1234',
      isApproved: true,
      isActive: true,
      images: ['https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg'],
      createdAt: '2024-01-10T10:00:00Z',
      rating: 4.8,
      totalOffers: 45
    },
    {
      id: '2',
      ownerName: 'Priya Sharma',
      storeName: 'Style Studio',
      category: 'Fashion',
      city: 'Delhi',
      email: 'priya@stylestudio.com',
      phone: '+91 9876543213',
      address: '456 Fashion Avenue, Connaught Place, New Delhi 110001',
      offerDetails: '30% off on all designer wear + Free styling consultation',
      bankDetails: 'SBI Bank ****5678',
      isApproved: true,
      isActive: true,
      images: ['https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg'],
      createdAt: '2024-01-12T10:00:00Z',
      rating: 4.6,
      totalOffers: 32
    },
    {
      id: '3',
      ownerName: 'Amit Patel',
      storeName: 'TechMart Electronics',
      category: 'Electronics',
      city: 'Bangalore',
      email: 'amit@techmart.com',
      phone: '+91 9876543214',
      address: '789 Tech Park, Electronic City, Bangalore 560100',
      offerDetails: '15% off on all gadgets + Extended warranty',
      bankDetails: 'ICICI Bank ****9012',
      isApproved: true,
      isActive: true,
      images: ['https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg'],
      createdAt: '2024-01-14T10:00:00Z',
      rating: 4.7,
      totalOffers: 28
    }
  ],
  pendingMerchants: [
    {
      id: '4',
      ownerName: 'Sarah Johnson',
      storeName: 'Beauty Bliss Salon',
      category: 'Salon',
      city: 'Mumbai',
      email: 'sarah@beautybliss.com',
      phone: '+91 9876543215',
      address: '321 Beauty Lane, Andheri East, Mumbai 400069',
      offerDetails: '25% off on all beauty services + Complimentary hair wash',
      bankDetails: 'Axis Bank ****3456',
      isApproved: false,
      isActive: false,
      images: ['https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg'],
      createdAt: '2024-01-18T10:00:00Z',
      rating: 0,
      totalOffers: 0
    }
  ],
  categories: [
    { id: '1', name: 'Hotels', icon: 'fas fa-bed', isActive: true },
    { id: '2', name: 'Salon & Spa', icon: 'fas fa-cut', isActive: true },
    { id: '3', name: 'Electronics', icon: 'fas fa-mobile-alt', isActive: true },
    { id: '4', name: 'Hospital & Clinics', icon: 'fas fa-hospital', isActive: true },
    { id: '5', name: 'Sports', icon: 'fas fa-dumbbell', isActive: true },
    { id: '6', name: 'Pharmacy', icon: 'fas fa-pills', isActive: true },
    { id: '7', name: 'Jewellery', icon: 'fas fa-gem', isActive: true },
    { id: '8', name: 'Clothing', icon: 'fas fa-tshirt', isActive: true },
    { id: '9', name: 'Florist', icon: 'fas fa-seedling', isActive: true },
    { id: '10', name: 'Books & Stationery', icon: 'fas fa-book', isActive: true },
    { id: '11', name: 'Entertainment', icon: 'fas fa-film', isActive: true },
    { id: '12', name: 'Home & Decor', icon: 'fas fa-home', isActive: true },
    { id: '13', name: 'Restaurant & Cafe', icon: 'fas fa-utensils', isActive: true },
    { id: '14', name: 'Optics', icon: 'fas fa-glasses', isActive: true },
    { id: '15', name: 'Footwears', icon: 'fas fa-shoe-prints', isActive: true },
    { id: '16', name: 'Fashion Accessories', icon: 'fas fa-ring', isActive: true },
    { id: '17', name: 'Mobile Store', icon: 'fas fa-mobile', isActive: true },
    { id: '18', name: 'Furniture', icon: 'fas fa-couch', isActive: true },
    { id: '19', name: 'Departmental Store', icon: 'fas fa-shopping-cart', isActive: true },
    { id: '20', name: 'Services', icon: 'fas fa-tools', isActive: true },
    { id: '21', name: 'Toys & Gifts Shop', icon: 'fas fa-gift', isActive: true },
    { id: '22', name: 'Education', icon: 'fas fa-graduation-cap', isActive: true }
  ],
  cards: [
    {
      id: '1',
      userId: '1',
      serviceNumber: 'CW-20240115-001',
      plan: 'Premium Annual',
      city: 'Mumbai',
      price: 1999,
      status: 'active' as const,
      purchasedAt: '2024-01-15T10:00:00Z',
      expiresAt: '2025-01-15T10:00:00Z',
      activatedAt: '2024-01-16T10:00:00Z'
    }
  ],
  activationRequests: [],
  contactForms: []
};

const initialState: AppState = {
  currentUser: null,
  isAuthenticated: false,
  isAdmin: false,
  users: [],
  merchants: [],
  pendingMerchants: [],
  categories: [],
  cards: [],
  activationRequests: [],
  contactForms: [],
  loading: false,
  selectedCity: 'All Cities',
  selectedCategory: 'All Categories'
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    
    case 'SET_USER':
      return {
        ...state,
        currentUser: action.payload,
        isAuthenticated: !!action.payload,
        isAdmin: action.payload?.isAdmin || false
      };
    
    case 'SET_ADMIN':
      return { ...state, isAdmin: action.payload };
    
    case 'ADD_USER':
      return {
        ...state,
        users: [...state.users, action.payload]
      };
    
    case 'ADD_MERCHANT':
      return {
        ...state,
        pendingMerchants: [...state.pendingMerchants, action.payload]
      };
    
    case 'APPROVE_MERCHANT':
      const merchantToApprove = state.pendingMerchants.find(m => m.id === action.payload);
      if (!merchantToApprove) return state;
      
      return {
        ...state,
        merchants: [...state.merchants, { ...merchantToApprove, isApproved: true, isActive: true }],
        pendingMerchants: state.pendingMerchants.filter(m => m.id !== action.payload)
      };
    
    case 'REJECT_MERCHANT':
      return {
        ...state,
        pendingMerchants: state.pendingMerchants.filter(m => m.id !== action.payload)
      };
    
    case 'UPDATE_MERCHANT':
      return {
        ...state,
        merchants: state.merchants.map(m =>
          m.id === action.payload.id ? { ...m, ...action.payload.data } : m
        )
      };
    
    case 'DELETE_MERCHANT':
      return {
        ...state,
        merchants: state.merchants.filter(m => m.id !== action.payload)
      };
    
    case 'ADD_CATEGORY':
      return {
        ...state,
        categories: [...state.categories, action.payload]
      };
    
    case 'UPDATE_CATEGORY':
      return {
        ...state,
        categories: state.categories.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload.data } : c
        )
      };
    
    case 'DELETE_CATEGORY':
      return {
        ...state,
        categories: state.categories.filter(c => c.id !== action.payload)
      };
    
    case 'ADD_CARD':
      return {
        ...state,
        cards: [...state.cards, action.payload]
      };
    
    case 'UPDATE_CARD':
      return {
        ...state,
        cards: state.cards.map(c =>
          c.id === action.payload.id ? { ...c, ...action.payload.data } : c
        )
      };
    
    case 'ADD_ACTIVATION_REQUEST':
      return {
        ...state,
        activationRequests: [...state.activationRequests, action.payload]
      };
    
    case 'UPDATE_ACTIVATION_REQUEST':
      return {
        ...state,
        activationRequests: state.activationRequests.map(r =>
          r.id === action.payload.id ? { ...r, ...action.payload.data } : r
        )
      };
    
    case 'ADD_CONTACT_FORM':
      return {
        ...state,
        contactForms: [...state.contactForms, action.payload]
      };
    
    case 'SET_SELECTED_CITY':
      return { ...state, selectedCity: action.payload };
    
    case 'SET_SELECTED_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    
    case 'INIT_DATA':
      return { ...state, ...action.payload };
    
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
  // Helper functions
  login: (email: string, password: string) => Promise<boolean>;
  adminLogin: (password: string) => boolean;
  signup: (userData: Omit<User, 'id' | 'createdAt' | 'isAdmin'>) => Promise<boolean>;
  logout: () => void;
  purchaseCard: (cardData: Omit<Card, 'id' | 'serviceNumber' | 'purchasedAt'>) => Promise<string>;
  submitMerchantApplication: (merchantData: Omit<Merchant, 'id' | 'createdAt' | 'isApproved' | 'isActive' | 'rating' | 'totalOffers'>) => Promise<string>;
  submitActivationRequest: (requestData: Omit<ActivationRequest, 'id' | 'submittedAt' | 'status'>) => Promise<string>;
  submitContactForm: (formData: Omit<ContactForm, 'id' | 'submittedAt'>) => Promise<boolean>;
  getFilteredMerchants: () => Merchant[];
  generateServiceNumber: () => string;
  saveToLocalStorage: () => void;
  loadFromLocalStorage: () => void;
}>({
  state: initialState,
  dispatch: () => {},
  login: async () => false,
  adminLogin: () => false,
  signup: async () => false,
  logout: () => {},
  purchaseCard: async () => '',
  submitMerchantApplication: async () => '',
  submitActivationRequest: async () => '',
  submitContactForm: async () => false,
  getFilteredMerchants: () => [],
  generateServiceNumber: () => '',
  saveToLocalStorage: () => {},
  loadFromLocalStorage: () => {}
});

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Initialize data on mount
  useEffect(() => {
    loadFromLocalStorage();
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveToLocalStorage();
  }, [state]);

  const saveToLocalStorage = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('citywitty-data', JSON.stringify({
        users: state.users,
        merchants: state.merchants,
        pendingMerchants: state.pendingMerchants,
        categories: state.categories,
        cards: state.cards,
        activationRequests: state.activationRequests,
        contactForms: state.contactForms,
        currentUser: state.currentUser,
        isAuthenticated: state.isAuthenticated,
        isAdmin: state.isAdmin
      }));
    }
  };

  const loadFromLocalStorage = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('citywitty-data');
      if (saved) {
        try {
          const data = JSON.parse(saved);
          dispatch({ type: 'INIT_DATA', payload: data });
        } catch (error) {
          console.error('Error loading from localStorage:', error);
          // Initialize with mock data if localStorage is corrupted
          dispatch({ type: 'INIT_DATA', payload: initialMockData });
        }
      } else {
        // Initialize with mock data if no saved data
        dispatch({ type: 'INIT_DATA', payload: initialMockData });
      }
    }
  };

  const generateServiceNumber = () => {
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(Math.random() * 9999).toString().padStart(4, '0');
    return `CW-${date}-${random}`;
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = state.users.find(u => u.email === email);
    if (user && password === 'password123') { // Mock password
      dispatch({ type: 'SET_USER', payload: user });
      dispatch({ type: 'SET_LOADING', payload: false });
      return true;
    }
    
    dispatch({ type: 'SET_LOADING', payload: false });
    return false;
  };

  const adminLogin = (password: string): boolean => {
    if (password === 'admin123') { // Mock admin password
      const adminUser = state.users.find(u => u.isAdmin) || {
        id: 'admin',
        email: 'admin@citywitty.com',
        name: 'Admin User',
        phone: '+91 9876543211',
        city: 'All Cities',
        isAdmin: true,
        createdAt: new Date().toISOString()
      };
      
      dispatch({ type: 'SET_USER', payload: adminUser });
      dispatch({ type: 'SET_ADMIN', payload: true });
      return true;
    }
    return false;
  };

  const signup = async (userData: Omit<User, 'id' | 'createdAt' | 'isAdmin'>): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUser = state.users.find(u => u.email === userData.email);
    if (existingUser) {
      dispatch({ type: 'SET_LOADING', payload: false });
      return false;
    }
    
    const newUser: User = {
      ...userData,
      id: Math.random().toString(36).substr(2, 9),
      isAdmin: false,
      createdAt: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_USER', payload: newUser });
    dispatch({ type: 'SET_USER', payload: newUser });
    dispatch({ type: 'SET_LOADING', payload: false });
    return true;
  };

  const logout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    dispatch({ type: 'SET_ADMIN', payload: false });
  };

  const purchaseCard = async (cardData: Omit<Card, 'id' | 'serviceNumber' | 'purchasedAt'>): Promise<string> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate payment processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const serviceNumber = generateServiceNumber();
    const newCard: Card = {
      ...cardData,
      id: Math.random().toString(36).substr(2, 9),
      serviceNumber,
      purchasedAt: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_CARD', payload: newCard });
    dispatch({ type: 'SET_LOADING', payload: false });
    return serviceNumber;
  };

  const submitMerchantApplication = async (merchantData: Omit<Merchant, 'id' | 'createdAt' | 'isApproved' | 'isActive' | 'rating' | 'totalOffers'>): Promise<string> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const applicationId = Math.random().toString(36).substr(2, 9).toUpperCase();
    const newMerchant: Merchant = {
      ...merchantData,
      id: applicationId,
      isApproved: false,
      isActive: false,
      rating: 0,
      totalOffers: 0,
      createdAt: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_MERCHANT', payload: newMerchant });
    dispatch({ type: 'SET_LOADING', payload: false });
    return applicationId;
  };

  const submitActivationRequest = async (requestData: Omit<ActivationRequest, 'id' | 'submittedAt' | 'status'>): Promise<string> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const requestId = Math.random().toString(36).substr(2, 9);
    const newRequest: ActivationRequest = {
      ...requestData,
      id: requestId,
      status: 'pending',
      submittedAt: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_ACTIVATION_REQUEST', payload: newRequest });
    dispatch({ type: 'SET_LOADING', payload: false });
    return requestId;
  };

  const submitContactForm = async (formData: Omit<ContactForm, 'id' | 'submittedAt'>): Promise<boolean> => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newForm: ContactForm = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      submittedAt: new Date().toISOString()
    };
    
    dispatch({ type: 'ADD_CONTACT_FORM', payload: newForm });
    dispatch({ type: 'SET_LOADING', payload: false });
    return true;
  };

  const getFilteredMerchants = () => {
    let filtered = state.merchants.filter(m => m.isApproved && m.isActive);
    
    if (state.selectedCity !== 'All Cities') {
      filtered = filtered.filter(m => m.city === state.selectedCity);
    }
    
    if (state.selectedCategory !== 'All Categories') {
      filtered = filtered.filter(m => m.category === state.selectedCategory);
    }
    
    return filtered;
  };

  const contextValue = {
    state,
    dispatch,
    login,
    adminLogin,
    signup,
    logout,
    purchaseCard,
    submitMerchantApplication,
    submitActivationRequest,
    submitContactForm,
    getFilteredMerchants,
    generateServiceNumber,
    saveToLocalStorage,
    loadFromLocalStorage
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export default AppContext;