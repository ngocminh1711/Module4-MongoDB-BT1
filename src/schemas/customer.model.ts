import { Schema, model } from "mongoose";

interface ICustomer {
    idCustomer: string;
    name: string;
    email: string;
    phoneNumber: number;
}

const customerSchema = new Schema<ICustomer>({
    idCustomer: String,
    name: String,
    email: String,
    phoneNumber: Number,
})

const Customer = model<ICustomer>('Customer', customerSchema);

export { Customer }