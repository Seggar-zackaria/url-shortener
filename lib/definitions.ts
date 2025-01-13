export interface UrlResponse {
  urls: Url[];
  createdAt: string;
  id: string;
}

export interface Url {
  id: string;
  originalUrl: string;
  shortCode: string;
  visits: number;
}
