## Day11. Login, Logout 처리 추가 구현

#### 1. axiosInstance header 추가

- axios header에 X-device-info 추가 (${OS} - ${Browser})
- 접속한 PC 정보를 알기 위하여 refresh token 생성 시 추가 저장할 정보 (더 강력한 정보 필요..)
