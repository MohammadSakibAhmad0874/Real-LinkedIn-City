# ─── LinkedInCity — Backend API ───────────────────────────────────────────────
# Hugging Face Spaces Docker deployment
# Runs Express on port 7860 (HF requirement)
# ──────────────────────────────────────────────────────────────────────────────

FROM node:18-alpine

# Metadata
LABEL maintainer="Mohammad Sakib Ahmad"
LABEL description="LinkedInCity Express API"

WORKDIR /app

# Copy package files first for layer caching
COPY package*.json ./

# Install ALL deps (express, cors, etc. are in dependencies)
RUN npm install

# Copy only the backend source — no frontend files needed
COPY api/ ./api/

# HF Spaces requirement: expose port 7860
EXPOSE 7860

# Use production entry point
ENV NODE_ENV=production
ENV PORT=7860

CMD ["node", "api/production.js"]
