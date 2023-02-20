export default interface paymentStatus {
    id : number;
    attributes: {
        tour_name: string,
        tour_type: string,
        user : string,
        status: boolean,
        quantity: number,
        tour_start : string,
        tour_end : string | null,
        total_price : number,
        image_url : string
    }
}