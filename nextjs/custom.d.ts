declare namespace NodeJS {
  interface ProcessEnv {
    MYSQL_ENDPOINT: string;
    MYSQL_DATABASE: string;
    MYSQL_USERNAME: string;
    MYSQL_PASSWORD: string;
    NEXT_PUBLIC_BASE_URL: string;
  }
}

declare module 'Cookies' {
  export function Cookies();
}
