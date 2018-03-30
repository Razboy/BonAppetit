export const actionType = {
    COMPANY_INFO: "COMPANY_INFO",
    DASHBOARD_INFO: "DASHBOARD_INFO",
    USERS_INFO: "USERS_INFO",
    REPORTS_INFO: "REPORTS_INFO"
};


const defaultState = {
    infoCompany: {},
    infoDashboard: {},
    infoUser:[],
    infoReport:[]
};

export default function Info(state = defaultState, action) {
    switch (action.type) {
        case "COMPANY_INFO":
            return {...state, infoCompany: action.payload};
            break;    
        case "DASHBOARD_INFO":
            return {...state, infoDashboard: action.payload};
            break;
        case "USERS_INFO":
            return {...state, infoUser: action.payload};
            break;
        case "REPORTS_INFO":
            return {...state, infoReport: action.payload};
            break;
        default:
            return state;
    } 
}


