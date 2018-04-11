export const actionType = {
    COMPANY_INFO: "COMPANY_INFO",
    DASHBOARD_INFO: "DASHBOARD_INFO",
    USERS_INFO: "USERS_INFO",
    REPORTS_INFO: "REPORTS_INFO",
    REPORT_FILTER: "REPORT_FILTER",
    LIST:"LIST",
    FILTER_USER: "FILTER_USER"
};

const defaultState = {
    infoCompany: {
        active: "",
        createdAt: "",
        description: "",
        imageQuality: "",
        language: "",
        logo: "",
        name: "",
        orderValue: "",
        ownerEmail: "",
        ownerPassword: "",
        totalSpace: 0,
        useSpace: 0,
        _id: ""
    },
    infoDashboard: {
        lastFiveReports:[],
        lastTwoWeeksReports:[],
        reportCount: 0,
        userCount: 0
    },
    infoUser:[],
    infoReport:[],
    list:[],
    filter: {
        user_id: 'all',
    }
};

export default function Info(state = defaultState, action) {
    switch (action.type) {
        case "COMPANY_INFO":
            return {...state, infoCompany: action.payload};
            break;    
        case "DEFAULT":
            return {...state,
                filter: {
                    user_id: 'all',
                }};
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
        case "REPORT_FILTER":
            return {...state, filter: action.payload};
            break;
        case "LIST":
            return {...state, list: action.payload};
            break;
        case "FILTER_USER":
            return {...state, filter: {...state.filter, user_id: action.user}};    
        default:
            return state;
    } 
}


