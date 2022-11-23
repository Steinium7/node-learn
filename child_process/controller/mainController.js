
module.exports.home = function(client){
    return async (req, res) =>{

        const reply = await client.lPush('emails', [`${req.params.id}`])
        if(reply) console.log('redis db lenght',reply); return res.send(`${req.params.id} to be sent`)
    
    }
}



