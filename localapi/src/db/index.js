const { Sequelize } = require('sequelize');

module.exports = async () => {

    const sequelize = new Sequelize('api_local', 'root', 'root', {
        host: ' 0.0.0.0:3306',
        port: 3306,
        dialect: 'mysql'
    });

    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return sequelize
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}