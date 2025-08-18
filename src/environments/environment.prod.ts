export const environment = {
  production: true,
  apiUrl: (window as any).ENV?.VITE_APP_API_URL || 'https://api-staging.cosf.fr',
};