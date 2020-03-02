FROM nginx:1.15-alpine

# Set working directory
WORKDIR /etc/nginx/geoip

# Add GeoIP Database
RUN wget -qO - https://storage.googleapis.com/otro-ops-pub/GeoIP.dat.gz | gunzip > GeoIP.dat \
    && wget -qO - https://storage.googleapis.com/otro-ops-pub/GeoLiteCity.dat.gz | gunzip > GeoLiteCity.dat

# Expose Port 80
EXPOSE 80


