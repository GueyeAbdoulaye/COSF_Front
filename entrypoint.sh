export const environment = {
  production: false,
  apiUrl: (window as any).ENV?.VITE_APP_API_URL || 'http://localhost:8080/',
};