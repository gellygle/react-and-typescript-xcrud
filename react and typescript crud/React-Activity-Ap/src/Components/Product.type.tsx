export interface IProduct{
    id: string;
    name: string;
    quantity: number;
    price: number;
    created_date: Date;
    updated_date: Date;
    user_id: string;
}



export enum PageEnum{
    list,
    add,
    edit
}