import {store} from "../App";
import {actionType} from "../Redusers/Company";
import {infoUser} from "./User";
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

export async function editReport(_id, category_id, comment, approved) {
    let token = localStorage.getItem('token');
    let response = await fetch( host + "/reports",
        {
            method: "PUT",
            headers: {
                "Authorization": token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: _id,
                category_id: category_id,
                comment: comment,
                approved: approved
            })
        });
    let data = await response.json();
    if (data.error) {
        console.log(data.message.toString());
    }else {
        infoUser();
    }
}