export interface IRepository<T> {
    // Tour
    getAll?(): Promise<T[] | null>;
    getTourById?(id: string|number) : Promise<T[] | null>;
    getTourByTitle?(title: string) : Promise<T[] | null>;
    getCategory?(type: string) : Promise<T[] | null>
    updateTour?(id: string|number, data : T) : Promise<T>;

    // Payment
    getPayment?(user: string | number, token : string) : Promise<T[] | null>;
    createPayment?(data: T, token : string): Promise<T>;
    deletePayment?(id: string|number , token : string): Promise<void>;
    updatePayment?(id: string|number, data: T , token: string): Promise<T>;


    // Review
    getReview?(tour_id: string|number): Promise<T[] | null>
    createReview?(data: T, token: string): Promise<T>;
    deleteReview?(review_id: string|number, token: string): Promise<void>;
}