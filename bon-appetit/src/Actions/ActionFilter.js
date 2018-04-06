import {store} from "../App";
import {actionType} from "../Redusers/Company";

export async function reportFilter(listReports) {
    store.dispatch({
        type: actionType.REPORT_FILTER,
        payload: listReports
    })
}