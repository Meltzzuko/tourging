import payment, { updatePayment } from "../models/payment"
import { IRepository } from "./IRepository"
import { userData } from "../helper";
import paymentStatus from "../models/paymentStatus";

export class PaymentRepository implements IRepository<payment | paymentStatus | updatePayment>{
    urlPrefix = "http://localhost:1337/api/payment-statuses"

    async getPayment(user: string | number, token : string): Promise<paymentStatus[] | null> {
        const res = await fetch(`${this.urlPrefix}?populate=*&filters[user][$eq]=${user}`,{
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        })
        const data = await res.json()
        return data.data
    }

    async createPayment(data: payment, token: string): Promise<payment> {
        const resp = await fetch(`${this.urlPrefix}`, {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const data_res = await resp.json()
        return data_res;
    }

    async deletePayment(id: string | number, token : string): Promise<void> {
        const resp = await fetch(`${this.urlPrefix}/${id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        const data_res = await resp.json()
        return data_res
    }

   async updatePayment(id: string | number, data: updatePayment, token: string): Promise<updatePayment> {
        const resp = await fetch(`${this.urlPrefix}/${id}`, {
            method: "PUT",
            headers : {
                "Authorization": `Bearer ${token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const data_res = await resp.json()
        return data_res
    }
}