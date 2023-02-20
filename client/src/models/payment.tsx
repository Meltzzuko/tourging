export default interface payment {
    data : {
        status: boolean;
        user : string;
        tour_name : string;
        tour_type : string;
        tour_start : string;
        tour_end : string | null;
        quantity : number;
        total_price : number;
        image_url : string;
    }
}