import {store} from "../App";
import {actionType} from "../Redusers/Company";
import {host} from "./Host";

export async function infoReport() {
    let token = localStorage.getItem('token');
    let response = await fetch(host+"/reports",
        {
            method: "GET",
            headers: {
                "Authorization": token
            }
        });
    let data = await response.json();
    store.dispatch({
        type: actionType.REPORTS_INFO,
        payload: data.message
    })
    return data;
}