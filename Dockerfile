# Use a specific Node.js version with Alpine
FROM node:20-alpine AS base

# Set working directory
WORKDIR /app

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat

# Install PNPM globally
RUN npm install -g pnpm@10.5.2
COPY package.json pnpm-lock.yaml* ./
RUN pnpm install --frozen-lockfile

# Build the Next.js application
FROM base AS builder
WORKDIR /app
RUN npm install -g pnpm@10.5.2
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the Next.js project in standalone mode
RUN pnpm build && \
    mkdir -p /app/.next/standalone && \
    cp -r .next/static .next/standalone/.next/static

# Prepare the final runtime image
FROM base AS runner
WORKDIR /app

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Create a non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs
RUN mkdir -p .next && chown -R nextjs:nodejs /app

# Copy necessary built files
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./

# Use non-root user
USER nextjs
EXPOSE 3000

# Start Next.js server correctly
CMD ["node", "server.js"]
