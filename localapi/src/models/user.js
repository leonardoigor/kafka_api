module.exports = (sequelize, Datatypes) => {

  const User = sequelize.define("User", {
    name: {
      type: Datatypes.STRING,
    },
    fone: {
      type: Datatypes.STRING,
    }
  })





  return User
}