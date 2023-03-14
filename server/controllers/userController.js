module.exports.register = (req, res, next ) => {

    res.status(200).json({
        message: req.body
    });

    console.log(req.body);



};