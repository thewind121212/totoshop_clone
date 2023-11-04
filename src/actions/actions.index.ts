const getAttributes = async ()  => {
    const getAttributes = await fetch('http://192.168.0.253:4000/attributes')
    const result = await getAttributes.json()
    return result
} 



const actions = {
    getAttributes
}

export default actions
