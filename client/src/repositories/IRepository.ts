export interface IRepository<T> {
    // Tour
    getAll?(): Promise<T[] | null>;
    getTourById?(id: string|number) : Promise<T[] | null>;
    getTourByTitle?(title: string) : Promise<T[] | null>;
    getCategory?(type: string) : Promise<T[] | null>
    updateTour?(id: string|number, data : T) : Promise<T>;

    // Payment
    getPayment?(user: string | number) : Promise<T[] | null>;
    createPayment?(data: T): Promise<T>;
    deletePayment?(id: string|number): Promise<void>;

    // Review
    getReview?(tour_id: string|number): Promise<T[] | null>
    createReview?(data: T): Promise<T>;
}