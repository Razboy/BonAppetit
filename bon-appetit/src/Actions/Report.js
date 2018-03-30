import {store} from "../App";
import {actionType} from "../Redusers/Company";

export async function infoReport() {
    let token = localStorage.getItem('token');
    let response = await fetch("http://web.bidon-tech.com:65059/reports",
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
}