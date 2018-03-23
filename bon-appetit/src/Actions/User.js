import {store} from "../App";
import {actionType} from "../Redusers/Company";

export async function infoDashboard() {
    let token = localStorage.getItem('token');
    let response = await fetch("http://web.bidon-tech.com:65059/dashboard",
        {
            method: "GET",
            headers: {
                "Authorization": token
            }
        });
    let data = await response.json();
    store.dispatch({
        type: actionType.DASHBOARD_INFO,
        payload: data.message
    })
}

export async function infoUser() {
    let token = localStorage.getItem('token');
    let response = await fetch("http://web.bidon-tech.com:65059/user",
        {
            method: "GET",
            headers: {
                "Authorization": token
            }
        });
    let data = await response.json();
    store.dispatch({
        type: actionType.USERS_INFO,
        payload: data.message
    })
}