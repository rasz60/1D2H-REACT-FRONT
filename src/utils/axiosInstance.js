import axios from "axios";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "/api",
});

// 요청 인터셉터로 Bearer 토큰 자동 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("1d2h-access-token");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
