# Sử dụng image Node.js chính thức
FROM node:18-alpine

# Thiết lập thư mục làm việc trong container
WORKDIR /app

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies
RUN npm install

# Sao chép tất cả các tệp vào thư mục làm việc
COPY . .

# Xây dựng ứng dụng Next.js
RUN npm run build

# Khởi động ứng dụng Next.js
CMD ["npm", "start"]

# Expose cổng mà ứng dụng sẽ chạy
EXPOSE 3000