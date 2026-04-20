import axios from 'axios'

export const callGenericApiCall = (token, api, data) => {
    // if (!token && !api && !data) {
    //     return
    // }
    try {
        return new Promise(async (resolve, reject) => {
            const response = await axios.get(api, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                }
            });
            console.log('::::response in callGenericApiCall',response)
            if (response && response.data) {
                resolve(response.data)
            }
            resolve(false)
        })
    } catch (error) {
        console.log('::::error in callGenericApiCall')
        resolve(false)
    }
}