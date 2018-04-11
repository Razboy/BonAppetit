import {store} from "../App";
import {actionType} from "../Redusers/Company";
import {host} from "./Host";

export async function infoDashboard() {
    let token = localStorage.getItem('token');
    let response = await fetch(host+"/dashboard",
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
    let response = await fetch(host+"/user",
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

export async function addUser(fullName, email, password) {
    let token = localStorage.getItem('token');
    let response = await fetch(host+"/user",
        {
            method: "POST",
            headers: {
                "Authorization": token,
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName: fullName,
                email: email,
                password: password,
                active: true
            })
        });
    return response
}

export async function changeUser(_id, fullName, email, password, active) {
    let token = localStorage.getItem('token');
    let response = await fetch(host+"/user",
        {
            method: "PUT",
            headers: {
                "Authorization": token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id : _id,
                fullName: fullName,
                email: email,
                password: password,
                active: active
            })
        });
    let data = await response.json();
    if (data.error) {
        console.log(data.message.toString());
    } else {
        infoUser();
    }
}