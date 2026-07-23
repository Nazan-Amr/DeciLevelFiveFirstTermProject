export const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  export const formatDate = (date: string): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  export const getImageUrl = (path?: string) => {
    if (!path) return undefined;
    const base = import.meta.env.VITE_API_URL ? String(import.meta.env.VITE_API_URL).replace('/api', '') : '';
    return `${base}${path}`;
  };