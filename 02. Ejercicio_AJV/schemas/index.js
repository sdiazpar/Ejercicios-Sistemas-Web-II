const Ajv2020 = require("ajv/dist/2020");
const ajv = new Ajv2020();

const schema_producto = require("./producto.schema.json")
const schema_usuario = require("./usuario.schema.json")

ajv.addSchema(schema_producto, "producto")
ajv.addSchema(schema_usuario, "usuario")

module.exports = ajv;