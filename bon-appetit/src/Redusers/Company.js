export const actionType = {
    COMPANY_INFO: "COMPANY_INFO",
    DASHBOARD_INFO: "DASHBOARD_INFO",
    USERS_INFO: "USERS_INFO",
    REPORTS_INFO: "REPORTS_INFO",
    REPORT_FILTER: "REPORT_FILTER"
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
    filter:[]
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
        case "REPORT_FILTER":
            return {...state, filter: action.payload};
            break;
        default:
            return state;
    } 
}


