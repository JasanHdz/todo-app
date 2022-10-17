import { IPayloadSignUp } from '@/interfaces';
import { config } from '@/config'

export async function createUser(payload: IPayloadSignUp) {
    const body = JSON.stringify(payload)
    try {
        const res = await fetch(`/api/user/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body
        })
        const data = await res.json()
        if (!res.ok) {
            throw new Error(data?.message);
        }
        return data
    } catch (error: any) {
        throw Error(error?.message)
    }
}