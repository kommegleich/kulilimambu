/** @type {import('next').NextConfig} */
const nextConfig = {
  // 외부 이미지 사용 시 도메인 추가 (예: picsum.photos, 자신의 CDN)
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos", pathname: "/**" },
    ],
  },
};

export default nextConfig;
