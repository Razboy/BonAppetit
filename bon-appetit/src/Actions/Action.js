import {store} from "../App";
import {actionType} from "../Redusers/Company";
import {host} from "./Host";

export async function infoCompany() {
    let token = localStorage.getItem('token');
    let response = await fetch(host+"/company/current",
        {
            method: "GET",
            headers: {
                "Authorization": token
            }
        });
    let data = await response.json();
    store.dispatch({
        type: actionType.COMPANY_INFO,
        payload: data.message
    })
}

export async function changeCompany(company) {
    let token = localStorage.getItem('token');
    let response = await fetch(host+"/company",
        {
            method: "PUT",
            headers: {
                "Authorization": token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                _id: company._id,
                name: company.name,
                ownerEmail: company.ownerEmail,
                ownerPassword: company.ownerPassword,
                description: company.description,
                logo: company.logo,
                imageQuality: company.imageQuality,
                orderValue: company.orderValue,
                active: true,
                language: company.language
            })
        });
    let data = await response.json();
    if (data.error) {
        console.log(data.message.toString());
    } else {
        infoCompany();
    }
}