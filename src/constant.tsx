
export const DOMAIN = import.meta.env.VITE_SERVER_DOMAIN + "/api/v1";
export const  ImageDomain = import.meta.env.VITE_SERVER_DOMAIN + "/public";

// https:\\v2-api-beta.ogbindia.com/api/v1/admin/registration/setting?admin_id=2

export const API_URL = {
    //admin login
    GET_GUEST_TOKEN:`${DOMAIN}/token`,
    GET_ADMIN_INFO:(admin_id:string) => `${DOMAIN}/admin/registration/setting?admin_id=${admin_id}`,
    GET_ADMING_LOGIN: `${DOMAIN}/admin/registration/login`,
    
    // TopBar API
    GET_TODAY_GOLD_RATE: `${DOMAIN}/admin/fetch/gold/rate`,
    UPDATE_TODAY_GOLD_RATE:(price:string) => `${DOMAIN}/admin/today/gold/rate?price=${price}`,
    GET_ALL_NOTIFICATION: `${DOMAIN}/admin/dashboard/notification`,

    // dashboard
    GET_OVERVIEW:`${DOMAIN}/admin/dashboard/overview`,
    GET_ALL_ALERT: `${DOMAIN}/admin/dashboard/alert`,
    GET_OVERVIEW_DEPOSIT_CHART: `${DOMAIN}/admin/dashboard/gold/deposited/chart`,
    GET_OVERVIEW_GOLD_CHART: `${DOMAIN}/admin/dashboard/gold/deposited`,
    GET_OVERVIEW_RECENT_REQUEST: `${DOMAIN}/admin/dashboard/fetch/recent/request`,
    GET_OVERVIEW_BOOKING_SLOT:`${DOMAIN}/admin/dashboard/fetch/recent/slots`,
    GET_WITHDRAW_GOLD_CHART: `${DOMAIN}/admin/dashboard/gold/withdrawn/chart`,
    GET_GOLD_SELL_CHART: `${DOMAIN}/admin/dashboard/gold/onsell/chart`,
    GET_GOLD_BARTER_CHART: `${DOMAIN}/admin/dashboard/gold/onbarter/chart`,
    GET_GOLD_IMMEDIATE_SELL_CHART: `${DOMAIN}/admin/dashboard/gold/immediate/sell/chart`,
    GET_WITHDRAW_REQUEST_LIST: `${DOMAIN}/admin/dashboard/fetch/withdraw/request`,
    GET_BARTER_REQUEST_LIST:`${DOMAIN}/admin/dashboard/fetch/barter/booking`,
    GET_DISPLAY_REQUEST_LIST: `${DOMAIN}/admin/dashboard/fetch/display/booking`,
    GET_IMMEDIATE_SELL_REQUEST_LIST: `${DOMAIN}/admin/dashboard/fetch/immidiate/sell`,
    

    //barter page
    GET_BARTER_AVAILABLE:`${DOMAIN}/admin/barter/ornament/fetch `,
    GET_BARTER_GIVEN:`${DOMAIN}/admin/barter/fetch/given`,
    GET_BARTER_HISTORY:`${DOMAIN}/admin/barter/fetch/history`,

    // Customer page

    GET_CUSTOEMR_OTP:(mobilenumber:string) => `${DOMAIN}/otp/send?mobilenumber=${mobilenumber}`,
    GET_VERIFY_OTP:(mobilenumber:string, otp:string) => `${DOMAIN}/otp/verify?mobilenumber=${mobilenumber}&otp=${otp}`,
    CHECK_USER:(mobilenumber:string) => `${DOMAIN}/user/check?mobilenumber=${mobilenumber}`,
    GET_DEPOSIT_REQUEST:(user_id:string) => `${DOMAIN}/admin/customer/request/deposit?user_id=${user_id}`,
    GET_WITHDRAW_REQUEST:(user_id:string) => `${DOMAIN}/admin/customer/request/withdraw?user_id=${user_id}`,
    GET_CUSTOMER_WITHDRAW_REQUEST: (user_id:string, ornament_id:string)=>`${DOMAIN}/admin/customer/request/withdraw/ornament?user_id=${user_id}&ornament_id=${ornament_id}`,
    GET_ORDER_REQUEST:(user_id:string) => `${DOMAIN}/admin/customer/request/fromapp/order?user_id=${user_id}`,
    GET_OTC_HOME: (user_id:string) => `${DOMAIN}/admin/customer/request/otc/home?user_id=${user_id}`,
    GET_OTC_WITHDRAW:(user_id:string) => `${DOMAIN}/admin/customer/request/fetch/forwithdraw?user_id=${user_id}`,
    GET_OTC_WITHDRAW_REQUEST:(user_id:string, ornament_id:string) => `${DOMAIN}/admin/customer/request/withdraw/ornament?user_id=${user_id}&ornament_id=${ornament_id}`,
    GET_OTC_BARTER: (user_id:string) => `${DOMAIN}/admin/customer/request/barter/fetch?user_id=${user_id}`,
    POST_OTC_ORNAMENTS: `${DOMAIN}/user/ornament/upload`,
    GET_OTC_BARTER_LIST:(user_id:string)=>`${DOMAIN}/admin/customer/request/fetch/barter/list?user_id=${user_id}`,
    GET_OTC_DISPLAY:(user_id:string) => `${DOMAIN}/admin/customer/request/fetch/fordisplay?user_id=${user_id}`,
    GET_OTC_IMMEDIATE_SELL:(user_id:string) => `${DOMAIN}/admin/customer/request/fetch/forsell?userid=${user_id}`,
    GET_OTC_BARTER_ORNAMENT_ADD: (userid:string, ornament_id:string) => `${DOMAIN}/admin/customer/request/barter/ornament/upload?userid=${userid}&ornament_id=${ornament_id}`,
    GET_OTC_BARTER_ORNAMENT_REMOVE: (userid:string, ornament_id:string) => `${DOMAIN}/admin/customer/request/barter/ornament/remove?userid=${userid}&ornament_id=${ornament_id}`,

    // ornaments page
    GET_DEPOSIT_ORNAMENTS:`${DOMAIN}/admin/ornament/all/fetch`,
    UPDATE_DEPOSIT_ORNAMENTS:`${DOMAIN}/admin/ornament/upload/image`,
    VIEW_DEPOSIT_ORNAMENTS:(ornament_id:string)=>`${DOMAIN}/admin/ornament/view/image?ornament_id=${ornament_id}`,
    GET_DISPLAY_ORNAMENTS:`${DOMAIN}/admin/ornament/fetch/display`,
    GET_SOLD_ORNAMENTS:`${DOMAIN}/admin/ornament/fetch/sold`,
    GET_WITHDRAWN_ORNAMENTS:`${DOMAIN}/admin/ornament/fetch/withdraw`,
    GET_LOCKER_ORNAMENTS:`${DOMAIN}/admin/ornament/fetch/locker`,
    GET_CATEGORIES_ORNAMENTS:`${DOMAIN}/admin/ornament/fetch/category`,
    
    // BUY ORDER
    GET_BUY_ORDER:`${DOMAIN}/admin/order/buy`,

    // premium collection
    GET_PREMIUM_COLLECTION:`${DOMAIN}/admin/premium/ornament/fetch`,
    UPDATE_STOCK_COUNT:(ornament_id:string, stock_count:string)=>`${DOMAIN}/admin/premium/ornament/stockcount?ornament_id=${ornament_id}&stock_count=${stock_count}`,
    UPLOAD_PREMIUM_IMAGE:`${DOMAIN}/premium/ornament/upload/img`,
    ADD_PREMIUM_ORNAMENTS:`${DOMAIN}/admin/premium/ornament/upload`,
    VIEW_PREMIUM_IMAGE:(ornament_id:string)=>`${DOMAIN}/admin/premium/ornament/fetch/images?ornament_id=${ornament_id}`,
    DELETE_PREMIUM_IMAGE:(image_id: string) =>`${DOMAIN}/admin/premium/ornament/image/delete?image_id=${image_id}`,
    GET_CATEGORIES_LIST : `${DOMAIN}/admin/ornament/fetch/category/dropdown`,
    
    // privilege
    GET_ALL_PRIVILEGE:`${DOMAIN}/admin/privilege/users`,
    GET_USER_PRIVILEGE:(user_id:string)=>`${DOMAIN}/admin/privilege/ornament?user_id=${user_id}`,
    GET_LOAN_PRIVILEGE:`${DOMAIN}/loan/fetch/active/admin`,
    UPDATE_LOAN_PRIVILEGE:(user_id:string, loan_id:string, settlement_amount:string)=>`${DOMAIN}/loan/settle/admin?user_id=${user_id}&loan_id=${loan_id}&settlement_amount=${settlement_amount}`,
    
    // register
    GET_REGISTER_USER:`${DOMAIN}/admin/registration/view/user `,
    POST_ADD_ADMIN: `${DOMAIN}/admin/registration/create`,
    GET_ALL_LOCKER: `${DOMAIN}/admin/dashboard/fetch/lockers`,

    // setting
   POST_RESET_PASSWORD:(admin_id:string, password:string) => `${DOMAIN}/admin/registration/reset/admin/password?admin_id=${admin_id}&password=${password}`,
}

export const graphOptions = [
    {
      value: "this_week",
      label: "This Week",
    },
    {
        value: "last_week",
        label: "Last Week",
      },
    {
      value: "this_month",
      label: "This Month",
    },
    {
      value: "last_six_months",
      label: "Last Six Months",
    },
    {
        value: "custom",
        label: "Custom",
      },
  ];


export type RowType = {
    getIsSelected: () => boolean;
    toggleSelected: (value: boolean) => void;
    getValue: (key: string) => any;
    original: any;
    index: number;
  };