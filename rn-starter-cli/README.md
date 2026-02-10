# Create RN Starter

A CLI tool to quickly create React Native projects with a modern stack:

- 📱 **Expo Router** - File-based routing
- 🎨 **Tailwind CSS** - Utility-first styling with NativeWind
- 🔄 **Convex** - Real-time backend
- 🔐 **Authentication** - Built-in auth system
- 📊 **State Management** - Zustand + TanStack Query
- 🌍 **Internationalization** - i18next
- 🧪 **Testing** - Jest + Testing Library
- 📱 **Multi-platform** - iOS, Android, Web

## Usage

```bash
npx @compiledideas/start
```

The CLI will prompt you for:

- Project name
- Display name
- Bundle ID
- Expo username
- URL scheme

## After Creation

1. Install dependencies: `pnpm install`
2. Set up Convex: `npx convex dev`
3. Update environment variables in `.env.*` files
4. Start development: `pnpm start`

## Features

- ✅ TypeScript configured
- ✅ ESLint + Prettier
- ✅ Husky + lint-staged
- ✅ Conventional commits
- ✅ EAS Build configured
- ✅ Multiple environments (dev/staging/prod)
