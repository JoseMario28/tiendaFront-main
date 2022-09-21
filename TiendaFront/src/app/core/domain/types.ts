
export interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  
}

export interface ICliente {
  client_id?: number;
  name?: string;
  surname?: string;
  email?: string;
  country?: string;
  dateOfBirth?: string;
  invoices?: IFactura[]
}

export interface IFactura {
  invoice_id?: number;
  invoiceDate?: string;
  totalPrice?: number;
  client?: ICliente;
  products?: IProducto[];
}

export interface IProducto {
  [x: string]: any;

  id?: number;
  name?: string;
  price?: number;
  inStock?: number;
  image?:string;
  category?: ICategoria;
}

export interface IProductoCesta {
  id?: number;
  name?: string;
  price?: number;
  cuantity?: number;
}

export interface ICategoria {
  id: number;
  name: string;
}

export interface ILoginRequest {
  username: string
  password: string

}

