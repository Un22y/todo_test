import axios from "axios"


export const url = 'https://todo-backend-2ezuwxji5-un22y.vercel.app/'
const headers = {
    "Content-Type":"application/json",
    'Access-Control-Allow-Origin': '*',
    "Accept":"*/*",
}

export default class PostServise {
    static async getAll(link) {
        const response = await axios.get(link)
        const data = response.data
        return data
    }
    static async create(link,newitem) {
        try{
            const response = await axios.post(link, JSON.stringify(newitem),{
                headers:headers
            })
            const data = response.data;
            return data;
        }
        catch(e){
            console.log(e)
        }
    }
    static async delete(link,id) {
        try {
            const response = await axios.delete(`${link}/${id}`,{
                headers:headers
            })
            const data = response.data
            return data;
        } catch (e) {
            console.log(e)
        }
    }
    static async updateOrder(link,id,param) {
        try {
            console.log(JSON.stringify(param))
            const response = await axios.put(`${link}/${id}`,JSON.stringify(param), {
                headers:headers
            })
            const data = response.data
            return data
        } catch (e) {
            console.log(e)
        }
    }
    static async update(link, param) {
        try {
            const response = await axios.put(link,JSON.stringify(param),{
                headers:{
                    "Content-Type":"application/json",
                    'Access-Control-Allow-Origin': '*',
                    "Accept":"*/*",
                }
            })
            const data = response.data;
            return data
        } catch (e) {
            console.log(e.message)
        }
    }
}
