export interface IRepository<T> {
    getAll(): Promise<T[] | null>;
    get?(id: string|number) : Promise<T[] | null>;
    getCategory?(type: string) : Promise<T[] | null>
}