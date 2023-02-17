export default interface Tours{
    id: number;
    attributes: {
        Title: string;
        Longdescription: string;
        price: number;
        available_seat: number;
        tour_start: string;
        tour_end: string | null;
        vehicle: string | null;
        image: {
            data: {
                attributes: {
                    formats: {
                        thumbnail: {
                            url: string;
                        }
                    }
                }
            }
        }
        category: {
            data: {
                attributes: {
                    type: string;
                }
            }
    }
}}