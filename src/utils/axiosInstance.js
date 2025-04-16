import axios from "axios";
const getDeviceInfo = () => {
  const userAgent = navigator.userAgent;

  let os = "Unknown OS";
  if (userAgent.includes("Win")) os = "Windows";
  else if (userAgent.includes("Mac")) os = "MacOS";
  else if (userAgent.includes("X11")) os = "UNIX";
  else if (userAgent.includes("Linux")) os = "Linux";
  else if (/Android/.test(userAgent)) os = "Android";
  else if (/iPhone|iPad|iPod/.test(userAgent)) os = "iOS";

  let browser = "Unknown Browser";
  if (userAgent.includes("Chrome")) browser = "Chrome";
  else if (userAgent.includes("Safari") && !userAgent.includes("Chrome"))
    browser = "Safari";
  else if (userAgent.includes("Firefox")) browser = "Firefox";
  else if (userAgent.includes("MSIE") || userAgent.includes("Trident"))
    browser = "Internet Explorer";
  else if (userAgent.includes("Edg")) browser = "Edge";

  return `${os} - ${browser}`;
};

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: "/api",
});

// 요청 인터셉터로 Bearer 토큰 자동 설정
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("1d2h-access-token");
    if (token) config.headers["Authorization"] = "Bearer " + token;
    config.headers["X-device-info"] = getDeviceInfo();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    const newAccessToken =
      response.headers["new-access-token"] || response.data.newAccessToken;
    if (newAccessToken) {
      localStorage.setItem("1d2h-access-token", newAccessToken);
    }

    return response;
  },
  (error) => {
    if (error.response.data.status === 401)
      alert(
        "로그인 유지 시간이 만료되었습니다. 다시 로그인해주세요.",
        function () {
          window.location.href = "/";
        }
      );
    return Promise.reject(error);
  }
);

export default axiosInstance;
