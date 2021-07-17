/// <reference types="express" />

declare namespace Express {
  export interface Request {
    user?: UserToken
  }

  export interface UserToken {
    // primary info
    _id: string;
    account: string;
    role: string;
    roles: string[];
    email: string;
    phoneNumber: string;
    verifyAction: any;
    displayName: string;
    avatar: string;
    // todo confirm model type user push ==================
    storefront?: string;
    partner?: string;
    trade_in_partner?: string;
    marketing_rep?: string;
    warehouse_employee?: string;
    online_sales_rep?: string;
    road_sales_rep?: string;
    customer_service_rep?: string;
    product_manager?: string;
    executive_staff?: string;
    // end todo ===========================================
    // additional key vs access internal service
    internal?: boolean;
    // end
    iat: number;
    exp: number;
  }

}
