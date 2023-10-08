import axios from 'axios'

export default function request(Options){
    return new Promise(async(resolve,reject)=>{
        let result = await axios(Options)
        return resolve(result.data)
    })
}
