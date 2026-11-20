import type { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import Cookies from "js-cookie";

export class Http {
  private api: AxiosInstance;
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL ?? "";

    this.api = axios.create({
      baseURL: this.baseURL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    /**
     * ===== REQUEST INTERCEPTOR =====
     */
    this.api.interceptors.request.use((config) => {
      const accessToken = Cookies.get("access_token");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    });

    /**
     * ===== RESPONSE INTERCEPTOR =====
     */
    this.api.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 401) {
          Cookies.remove("access_token");
          if (typeof window !== "undefined") {
            // eslint-disable-next-line @next/next/no-location-assign-relative-destination -- Axios interceptor runs outside React router context
            window.location.href = "/auth/login";
          }
        }

        return Promise.reject(error.response?.data || error);
      }
    );
  }

  /**
   * ===================== HTTP METHODS =====================
   */
  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.get<T>(url, config);
    return response.data;
  }

  public async post<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.post<T>(url, data, config);
    return response.data;
  }

  public async put<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.put<T>(url, data, config);
    return response.data;
  }

  public async patch<T>(
    url: string,
    data?: unknown,
    config?: AxiosRequestConfig
  ): Promise<T> {
    const response = await this.api.patch<T>(url, data, config);
    return response.data;
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response = await this.api.delete<T>(url, config);
    return response.data;
  }
}
