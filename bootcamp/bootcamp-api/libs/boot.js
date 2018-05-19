module.exports = (app) => {

    app.listen(app.get('port'), () => {
        console.log(`bootcamp API - porta ${app.get('port')}`);
    });
    
};