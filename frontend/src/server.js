import axios from "axios";
import { env } from "./config";
import { baseurl } from "./config";

export default function server(url, method='get', component, state){
    if (method === 'get'){
        axios.get(baseurl + url).then(function (response) {
            component.setState({
                [state]:response.data
            })
            if (env === 'dev'){
                console.log('GET '+ baseurl + url + ': ' + response.data);
            }
        })
        .catch(function (error) {
            console.log('GET '+ baseurl + url + ': ' + error);
        });
    }
    else if (method === 'post'){
        axios.get(baseurl + url).then(function (response) {
            component.setState({
                [state]:response.data
            })
            if (env === 'dev'){
                console.log('GET '+ baseurl + url + ': ' + response.data);
            }
        })
        .catch(function (error) {
            console.log('GET '+ baseurl + url + ': ' + error);
        });
    }
}
