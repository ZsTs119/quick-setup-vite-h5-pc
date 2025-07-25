# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Essential Commands

### Development
```bash
# PC development (port 3000)
pnpm dev

# H5 development
pnpm dev:h5

# Production mode (preview)
pnpm pro
pnpm proH5
```

### Building
```bash
# Development builds
pnpm build:dev
pnpm build:dev:h5

# Production builds
pnpm build:prod
pnpm build:prod:h5
```

### Type Checking
```bash
pnpm type-check
```

### Other Commands
```bash
# Preview production build
pnpm preview
```

### Linting and Code Quality (if available)
```bash
# Check for linting issues (if ESLint is configured)
# pnpm lint

# Auto-fix linting issues  
# pnpm lint:fix

# Format code (if Prettier is configured)
# pnpm format
```

## Project Architecture

### Prerequisites and Environment Setup
- **Node.js**: Version 16.x or higher recommended
- **Package Manager**: pnpm (preferred), npm, or yarn
- **Operating System**: Windows 11 + WSL, macOS, or Linux
- **IDE**: VS Code or Cursor with Vue/TypeScript extensions

### Installation and Setup
```bash
# Clone the repository
git clone <repository-url>
cd vue3-vite-multi-platform-template

# Install dependencies
pnpm install

# Copy environment files and configure
cp .env.development.example .env.development  # if exists
cp .env.production.example .env.production    # if exists

# Start development server
pnpm dev
```

### Multi-Platform Configuration
This is a Vue 3 multi-platform template supporting both H5 and PC environments:

- **Environment Detection**: Vite config switches baseURL between dev/prod environments
- **UI Libraries**: Element Plus (PC) + Vant (H5) with auto-import
- **Build Modes**: Separate build commands and env files for H5/PC variants
- **Responsive Detection**: Mobile detection via window.innerWidth < 768px

### Core Architecture Components

#### HTTP Request System (src/utils/http/index.ts)
Sophisticated Axios wrapper with:
- **Request signing**: MD5 signature generation for security
- **Device fingerprinting**: Uses @fingerprintjs/fingerprintjs for clientId
- **Token management**: Auto-injects tokens, handles 10001 (expired) and 10002 (silent) error codes
- **Stream requests**: Dedicated streamRequest function for real-time APIs
- **Request format**: All requests wrapped in standardized BaseRequestData structure

#### State Management (Pinia stores)
- `useUserStore`: User info with persistent storage and logout cleanup
- `useTokenStore`: JWT token management with validation
- `useThemeStore`: Multi-theme system supporting light/dark/red/purple themes
- `useLoginStore`: Login state management

#### Theme System
Advanced theming with View Transitions API:
- **Theme Variables**: Defined in src/styles/themes/variables.scss
- **Theme Switching**: useThemeTransition hook provides smooth animations
- **Path Aliases**: @, @c (components), @u (utils) configured in vite.config.ts

#### API Architecture
- **Modular Organization**: APIs grouped by business domain in src/apis/modules/
- **Type Safety**: All requests/responses typed in src/apis/types/
- **Unified Export**: All APIs exported via namespace from src/apis/index.ts
- **Request Flow**: parameter → signature → device fingerprint → token → send

#### Auto-Import Configuration
Vite plugins handle automatic imports:
- Vue APIs auto-imported (no manual imports needed)
- Element Plus + Vant components auto-resolved
- Component types generated in auto-imports.d.ts and components.d.ts

### Key Development Patterns

#### API Usage Pattern
```typescript
// Standard request
import { userApi } from '@/apis'
const result = await userApi.login(params)

// Stream request  
import { streamRequest } from '@/utils/http'
streamRequest(url, params, onChunk, onComplete, onError, signal)
```

#### Component Structure
- Views in src/views/ with index.vue as entry point
- Private components in views/[module]/components/
- Global components in src/components/ with PascalCase directories
- Routes modularized in src/router/[module]/

#### Environment Configuration
Multiple .env files for different platform/environment combinations:
- .env.development / .env.production (PC)
- .env.developmentH5 / .env.productionH5 (H5)

### Security Features
- Request signing with MD5 algorithm
- Device fingerprinting for additional security layer
- Automatic token injection and expiration handling
- CSRF protection via signatures

### Build Optimizations
- Terser minification with console/debugger removal in production
- Manual chunk splitting for vendor libraries
- SVG icon optimization with vite-plugin-svg-icons
- Gzip compression and image optimization in production builds

## Troubleshooting

### Common Issues

#### Build Errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install

# Clear Vite cache
rm -rf .vite
pnpm dev

# Type checking issues
pnpm type-check
```

#### Development Server Issues
```bash
# Port already in use
# Check what's running on port 3000
lsof -i :3000  # macOS/Linux
netstat -ano | findstr :3000  # Windows

# Kill the process or use different port
pnpm dev --port 3001
```

#### Environment Variables Not Loading
- Ensure .env files are in project root
- Check file naming: `.env.development`, `.env.production`, etc.
- Restart development server after changing .env files
- Environment variables must start with `VITE_` to be accessible in client

#### Build Output Issues
```bash
# Clean previous builds
rm -rf dist
pnpm build:prod

# Analyze bundle size
pnpm build:prod && npx vite-bundle-analyzer dist
```

## Deployment

### Environment Configuration
Ensure proper environment variables are set for each environment:

**Development**: `.env.development`
```bash
VITE_API_BASE_URL=/api
VITE_NODE_ENV=development
VITE_TEST_URL=http://localhost:8080
```

**Production**: `.env.production`
```bash
VITE_API_BASE_URL=/api
VITE_NODE_ENV=production
VITE_PRO_URL=https://your-production-api.com
```

### Build and Deploy Commands
```bash
# Production build for PC
pnpm build:prod

# Production build for H5
pnpm build:prod:h5

# Serve locally to test production build
pnpm preview
```

### Server Configuration
For SPA deployment, configure your web server to serve `index.html` for all routes:

**Nginx Example**:
```nginx
location / {
    try_files $uri $uri/ /index.html;
}
```

**Apache Example**:
```apache
RewriteEngine On
RewriteRule ^(?!.*\.).*$ /index.html [L]
```

## Security Best Practices

### API Security
- All requests are signed with MD5 signatures
- Device fingerprinting for additional security layer
- Automatic token injection and expiration handling
- CSRF protection via request signatures

### Environment Security
- Never commit `.env` files to version control
- Use different API keys for different environments
- Rotate API keys regularly
- Validate all user inputs on both client and server

### Build Security
- Remove console.log and debugger statements in production
- Enable source map only in development
- Use HTTPS in production
- Implement proper CORS policies

## Performance Optimization

### Bundle Optimization
- Automatic code splitting by vendor libraries
- Dynamic imports for route-based code splitting
- Tree shaking for unused code elimination
- Gzip compression for static assets

### Runtime Performance
- Vue 3 Composition API for better tree shaking
- Pinia for lightweight state management
- Vite for fast development and optimized builds
- Image optimization with vite-imagetools

### Monitoring
```bash
# Analyze bundle size
pnpm build:prod
# Bundle analyzer will automatically open if configured

# Check for unused dependencies
npx depcheck

# Performance audit
npx lighthouse http://localhost:3000 --view
```