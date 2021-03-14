module.exports.home = function(req, res) {
    console.log('in home contro');
    return res.render('home');
};