const PROXY_CONFIG = [
  {
    context: ['/tenant'],
    target: process.env['OCTO_API_URL'] || 'https://localhost:5001',
    secure: false,
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
