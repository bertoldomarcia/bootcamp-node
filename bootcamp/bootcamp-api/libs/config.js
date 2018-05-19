module.exports = {
    database: 'bootcamp',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: 'bootcamp.sqlite',
        define: {
            underscored: true
        }    
    },
    jwtSecret: "B007CAMP-API",
    jwtSession: {
        session: false
    }
};