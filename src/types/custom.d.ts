declare module '*.svg' {
  import React = require('react');
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

// Vite 환경 변수 타입 정의
interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_OAUTH2_REDIRECT_URI: string;
  readonly VITE_GOOGLE_CLIENT_ID: string;
  readonly VITE_GOOGLE_CLIENT_SECRET: string;
  readonly MODE: string;
  readonly DEV: boolean;
  readonly PROD: boolean;
  // 기타 환경 변수...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
