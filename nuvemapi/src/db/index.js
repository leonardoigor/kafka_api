const { Sequelize } = require('sequelize');

module.exports = async () => {

    const sequelize = new Sequelize('api_local', 'root', 'root', {
        host: 'db_local',
        port: 3306,
        dialect: 'mysql'
    });
    console.log('connection to db initialize');
    try {
        sequelize.authenticate();
        console.log('Connection has been established successfully.');
        return sequelize
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}