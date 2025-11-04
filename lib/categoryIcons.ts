import {
    Store,
    ShoppingBag,
    Utensils,
    Dumbbell,
    Scissors,
    Pill,
    Wrench,
    Home,
    BookOpen,
    Music,
    Smartphone,
    Camera,
    Watch,
    Zap,
    Car,
    MapPin,
    LucideIcon,
} from 'lucide-react';

// Map of categories to lucide-react icons
export const categoryIconMap: Record<string, LucideIcon> = {
    'Electronics': Smartphone,
    'Fashion': ShoppingBag,
    'Restaurant': Utensils,
    'Fitness': Dumbbell,
    'Salon': Scissors,
    'Medical': Pill,
    'Repair': Wrench,
    'Home': Home,
    'Education': BookOpen,
    'Entertainment': Music,
    'Jewelry': Watch,
    'Beauty': Camera,
    'Grocery': Store,
    'Service': Zap,
    'Automotive': Car,
    'Travel': MapPin,
};

// Get icon for a category (case-insensitive), fallback to Store
export const getCategoryIcon = (category: string): LucideIcon => {
    const normalized = category
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');

    return categoryIconMap[normalized] || Store;
};