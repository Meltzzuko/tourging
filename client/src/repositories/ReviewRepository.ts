import Review from "../models/review";
import { IRepository } from "./IRepository";
import { userData } from "../helper";
import Postreview from "../models/postreview";

const user = userData()

export class ReviewRepository implements IRepository<Review | Postreview>{
    urlPrefix = "http://localhost:1337/api/reviews"
    token = user.jwt

    async getReview(tour_id: string | number): Promise<Review[] | null> {
        const res = await fetch(`${this.urlPrefix}?filters[tour_id][$eq]=${tour_id}`);
        const data = await res.json();
        return data.data;
    }

    async createReview(data: Postreview): Promise<Postreview> {
        const resp = await fetch(`${this.urlPrefix}`, {
            method: "POST",
            headers: { 
                "Authorization": `Bearer ${this.token}`,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });
        const data_res = await resp.json()
        return data_res;
    }

    async deleteReview(review_id: string | number): Promise<void> {
        const resp = await fetch(`${this.urlPrefix}/${review_id}`, {
            method: "DELETE",
            headers: {
                "Authorization": `Bearer ${this.token}`,
            }
        })
        const data = await resp.json()
        return data.data;
    }
}