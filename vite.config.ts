import { defineConfig } from 'vite'
import { internalIpV4 } from 'internal-ip'

export default defineConfig(async () => {
  const host = await internalIpV4();
  return {
    // prevent vite from obscuring rust errors
    clearScreen: false,
    server: {
      host: '0.0.0.0', // listen on all addresses
      port: 5173,
      // Tauri expects a fixed port, fail if that port is not available
      strictPort: true,
      hmr: {
        protocol: 'ws',
        host,
        port: 5183
      },
    },
    // to make use of `TAURI_PLATFORM`, `TAURI_ARCH`, `TAURI_FAMILY`,
    // `TAURI_PLATFORM_VERSION`, `TAURI_PLATFORM_TYPE` and `TAURI_DEBUG`
    // env variables
    envPrefix: ['VITE_', 'TAURI_'],
    build: {
      // Tauri supports es2021
      target: ['es2021', 'chrome100', 'safari13'],
      // don't minify for debug builds
      minify: !process.env.TAURI_DEBUG ? 'esbuild' : false,
      // produce sourcemaps for debug builds
      sourcemap: !!process.env.TAURI_DEBUG,
    }
  }
})
