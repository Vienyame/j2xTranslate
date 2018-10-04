export const environment = {
  production: true,
  gaTrackingCode: 'UA-117353136-3',
  googleAnalytics: true,
  backend: {
    protocol: 'http',
    host: '127.0.0.1',
    port: '9000',
    endpoints: {
      upload: '/api/upload',
      template: '/api/template'
    }
  }
};
