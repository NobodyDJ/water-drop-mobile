# 使用 node 18 版本作为构建阶段
FROM node:18.20.0 AS builder

# 将 package.json 和 pnpm-lock.yaml 复制到容器中
# COPY package.json pnpm-lock.yaml ./

# 将项目文件复制到容器中
COPY . .

# 安装 pnpm 包管理器并安装依赖项
RUN npm install pnpm -g --registry=https://registry.npmmirror.com/ \
    && pnpm install --shamefully-hoist --registry=https://registry.npmmirror.com/

# 运行构建命令
RUN pnpm run build

# 使用 nginx 作为生产环境阶段
FROM nginx:1.26.2

# 复制构建的文件到 nginx 目录
COPY --from=builder /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf/nginx.conf