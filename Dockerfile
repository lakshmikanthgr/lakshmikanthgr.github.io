# Simple static site Dockerfile using nginx
FROM nginx:stable-alpine

# Remove default content and copy site into nginx html dir
RUN rm -rf /usr/share/nginx/html/*
COPY . /usr/share/nginx/html/

# Expose default HTTP port
EXPOSE 80

# Run nginx in foreground
CMD ["nginx", "-g", "daemon off;"]
