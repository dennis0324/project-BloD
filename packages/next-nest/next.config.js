/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode:true,
}

module.exports = {
  ...nextConfig,
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return 'constant-build-id'
  }
}
