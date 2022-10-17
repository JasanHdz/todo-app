// CREATE My CUSTOM axios

export interface AxiosResponse<T = any, D = any>  {
    data: T;
    status: number;
    statusText: string;
    request?: any;
  }

export default class axios {
    private baseURL: string
    constructor(baseURL: string) {
        this.baseURL = baseURL
    }
    /**
     * REQUEST METHOD
     */
    private async request({ path, method, body }: { path: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any }) {
        try {
            const res = await fetch(`${this.baseURL}${path}`, {
                method: method,
                credentials: 'same-origin',
                headers: { 'Content-Type': 'application/json' },
                body: body ? JSON.stringify(body) : undefined
            })
            const data = await res.json()
            if (!res.ok) {
                throw new Error(data?.message);
            }
            return data
        } catch (error: any) {
            console.log(error)
            throw Error(error)
        }
    }

    /**
     * @methods CRUD
     */
    public get<T = any, R = AxiosResponse<T>, D = any>(path: string, data?: D): Promise<R> {
        return this.request({ method: 'GET', path, body: data })
    }

    public post<T = any, R = AxiosResponse<T>, D = any>(path: string, data?: D): Promise<R> {
        return this.request({ method: 'POST', path, body: data })
    }

    public put<T = any, R = AxiosResponse<T>, D = any>(path: string, data?: D): Promise<R> {
        return this.request({ method: 'PUT', path, body: data })
    }

    public delete<T = any, R = AxiosResponse<T>, D = any>(path: string, data?: D): Promise<R> {
        return this.request({ method: 'POST', path, body: data })
    }


    public static create({ baseURL }: { baseURL: string } ): axios {
        const request = new axios(baseURL)
        return request
    }
}
