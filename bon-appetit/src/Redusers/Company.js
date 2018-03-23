export const actionType = {
    COMPANY_INFO: "COMPANY_INFO",
    DASHBOARD_INFO: "DASHBOARD_INFO",
    USERS_INFO: "USERS_INFO"
};


const defaultState = {
    companyInfo: {},
    infoDashboard: {},
    infoUser:[]
};

export default function Info(state = defaultState, action) {
    switch (action.type) {
        case "COMPANY_INFO":
            return {...state, companyInfo: action.payload};
            break;    
        case "DASHBOARD_INFO":
            return {...state, infoDashboard: action.payload};
            break;
        case "USERS_INFO":
            return {...state, infoUser: action.payload};
            break;
        default:
            return state;
    } 
}


