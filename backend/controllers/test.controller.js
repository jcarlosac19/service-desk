
exports.routerTest = (req, res) =>{
    res.send({
        message: "This is a test.", 
        status: "OK",
        message_body: req.body
    })
}