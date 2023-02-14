export default interface Tours{
    id: number;
    attributes: {
        Title: string;
        Longdescription: string;
        price: number;
        available_seat: number;
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