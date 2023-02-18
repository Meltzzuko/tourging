export interface IRepository<T> {
    getAll?(): Promise<T[] | null>;
    getTour?(id: string|number) : Promise<T[] | null>;
    getCategory?(type: string) : Promise<T[] | null>
    getPayment?(user: string | number) : Promise<T[] | null>;
    createPayment?(data: T): Promise<T>;
    updateTour?(id: string|number, data : T) : Promise<T>;
}