import axios from "axios";
import Tours from "../models/tour";
import { IRepository } from "./IRepository";

export class TourRepository implements IRepository<Tours>{
    urlPrefix = "http://localhost:1337/api/user-tours?populate=*"

    async getAll(): Promise<Tours[] | null> {
        const resp = await fetch(`${this.urlPrefix}`);
        const data = await resp.json();
        return data.data;
    }

    async get(id: string): Promise<Tours[] | null> {
        const resp = await fetch(`${this.urlPrefix}&filters[id][$eq]=${id}`);
        const data = await resp.json();
        return data.data
    }
  }