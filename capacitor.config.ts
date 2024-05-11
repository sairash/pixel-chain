import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.chainpixels.app',
  appName: 'ChainPixels',
  webDir: 'dist',
  server:{
    androidScheme: "http"
  }
};

export default config;
