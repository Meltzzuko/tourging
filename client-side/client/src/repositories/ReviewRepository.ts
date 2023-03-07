import Review from "../models/review";
import { IRepository } from "./IRepository";
import { userData } from "../helper";
import Postreview from "../models/postreview";

export class ReviewRepository implements IRepository<Review | Postreview>{
    urlPrefix = "http://localhost:1337/api/reviews"

    async getReview(tour_id: string | number): Promise<Review[] | null> {
        const res = await fetch(`${this.urlPrefix}?filters[tour_id][$eq]=${tour_id}`);
        const data = await res.json();
        return data.data;
    }

    async createReview(data: Postreview, token: string): Promise<Postreview> {
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

    async deleteReview(review_id: string | number, token: string): Promise<void> {
        const resp = await fetch(`${this.urlPrefix}/${review_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${token}`,
            }
        })
        const data = await resp.json()
        return data.data;
    }
}