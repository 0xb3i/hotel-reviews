export interface InsforgeClient {
  request<T>(path: string): Promise<T>;
}

class HttpInsforgeClient implements InsforgeClient {
  constructor(private readonly baseUrl: string, private readonly anonKey?: string) {}

  async request<T>(path: string): Promise<T> {
    const url = path.startsWith("http") ? path : `${this.baseUrl}${path}`;

    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...(this.anonKey ? { Authorization: `Bearer ${this.anonKey}` } : {})
      },
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error(`请求失败: ${response.status}`);
    }

    return (await response.json()) as T;
  }
}

export function createInsforgeClient(baseUrl?: string, anonKey?: string): InsforgeClient {
  const resolvedBaseUrl = baseUrl || process.env.NEXT_PUBLIC_INSFORGE_URL || "";

  if (!resolvedBaseUrl) {
    return new HttpInsforgeClient("", anonKey || process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY);
  }

  return new HttpInsforgeClient(resolvedBaseUrl, anonKey || process.env.NEXT_PUBLIC_INSFORGE_ANON_KEY);
}
