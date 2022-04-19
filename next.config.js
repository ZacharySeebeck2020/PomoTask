/** @type {import('next').NextConfig} */
const path = require("path");
const withPWA = require('next-pwa');

const nextConfig = {
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
  pwa: {
    dest: 'public'
  }
};

module.exports = withPWA(nextConfig);