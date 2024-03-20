exports.handler = async function() {
    try{
       const response = await fetch(`https://api-bdc.net/data/ip-geolocation?key=${process.env.GEOLOCATOR_API}`, {method: "GET"})
           .then(response => response.json())
           .then(data => ({statusCode: 200, body: data}))
        if (response.statusCode === 200){
            return {
                statusCode: 200,
                body: JSON.stringify({message: "Location detect was successful", data:response.body, statusCode:200})
            }
        }
        else{
            let error= new Error("Location detect was unsuccessful");
            error.cause = {statusCode:response.status, statusText:response.statusText}
            throw error;
        }
    }
    catch(error){
        console.error(error)
        console.error(`Location detect was unsuccessful ${error.cause.statusCode}`);
        return {
            statusCode: error.cause.statusCode,
            body: JSON.stringify(error.cause.statusText)
        }
    }
}