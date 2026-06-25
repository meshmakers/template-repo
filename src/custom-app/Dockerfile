FROM nginx:alpine AS base
WORKDIR /usr/share/nginx/html
EXPOSE 80

FROM node:24.15-alpine AS build

ARG TELERIK_LICENSE
ENV TELERIK_LICENSE=${TELERIK_LICENSE}

ARG OCTO_LIB_VERSION=0.1.0
ARG NPM_PRIVATE_URI
ARG OCTO_PRIVATE_NUGET_CERTIFICATE

WORKDIR /src/src/custom-app

COPY src/custom-app/package*.json ./

# Copy CA certificate for private npm registry (if provided)
COPY ${OCTO_PRIVATE_NUGET_CERTIFICATE:-/dev/null} /tmp/mm-ca.crt
ENV NODE_EXTRA_CA_CERTS=/tmp/mm-ca.crt

# Configure private registry, resolve dist-tag to exact version, replace file: references
RUN echo "@meshmakers:registry=${NPM_PRIVATE_URI:-https://registry.npmjs.org}" > .npmrc \
  && echo ".npmrc: $(cat .npmrc)" \
  && RESOLVED=$(npm view "@meshmakers/octo-services@${OCTO_LIB_VERSION}" version 2>/dev/null || echo "${OCTO_LIB_VERSION}") \
  && echo "Resolved version: ${RESOLVED}" \
  && node -e " \
    const fs = require('fs'); \
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8')); \
    const v = '${RESOLVED}'; \
    Object.keys(pkg.dependencies).filter(k => k.startsWith('@meshmakers/')).forEach(k => { \
      console.log('  ' + k + ': ' + pkg.dependencies[k] + ' -> ' + v); \
      pkg.dependencies[k] = v; \
    }); \
    fs.writeFileSync('package.json', JSON.stringify(pkg, null, 2)); \
  " \
  && npm install --package-lock-only --ignore-scripts

# Published @meshmakers/* libs now peer @angular/* ^22 (Tier 0 shipped on v22),
# so a strict install resolves cleanly.
RUN npm ci --ignore-scripts

COPY src/custom-app/ ./

FROM build AS publish
RUN npm run build:prod

FROM base AS final
WORKDIR /usr/share/nginx/html
COPY --from=publish /src/src/custom-app/nginx.conf /etc/nginx/nginx.conf
COPY --from=publish /src/src/custom-app/entrypoint.sh /docker-entrypoint.d/40-config.sh
RUN chmod +x /docker-entrypoint.d/40-config.sh
COPY --from=publish /src/src/custom-app/dist/custom-app/browser .

CMD ["nginx", "-g", "daemon off;"]
