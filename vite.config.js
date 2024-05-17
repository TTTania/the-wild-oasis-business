import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    eslintPlugin({
      exclude: ["/virtual:/", "node_modules/**"],
    }),
  ],
});

// export default defineConfig({
//   plugins: [
//     react(),
//     eslint({
//       exclude: ['/virtual:/**', 'node_modules/**'],
//     }),
// });

// export default defineConfig(({ mode }) => {
//   return {
//       server: {
//           port: 3000,
//       },
//       plugins: [
//           vue(),
//           eslintPlugin({
//               exclude: ['/virtual:/', 'node_modules/**']
//           })
//       ],
//       resolve: {
//           alias: {
//               '@': resolve(__dirname, 'src'),
//               'environment': mode === 'production' ? resolve(__dirname, 'src/environments/environment.prod') : resolve(__dirname, 'src/environments/environment')
//           }
//       },
//   }
// });
