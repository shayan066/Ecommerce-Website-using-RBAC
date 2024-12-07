
const roleModel = require('../models/roleModel')

// Add Role
module.exports.addRole = async (req, res) => {

  const role = req.body.role
  const permissions = req.body.permissions
  const newRole = await roleModel({role, permissions})
  const isSaved = await newRole.save()

  if (isSaved){
    return res.send({code: 200, message: "Role Added"})
  }
  else{
    return res.send({code: 500, message: "Role not Added"})
  }

}

// Delete Role
module.exports.deleteRole = async (req, res) => {
  return res.send({code: 200, message: "Role Deleted"})
}