const express = require("express");
const ajv = require("./schemas");

const app = express();
app.use(express.json());

function validateSchema(schemaKey) {
  return (req, res, next) => {
    const validate = ajv.getSchema(schemaKey);
    if (!validate(req.body)) {
      return res.status(400).json({ error: "JSON no válido", details: validate.errors });
    }
    next();
  };
}

app.post("/validar-producto", validateSchema("producto"), (req, res) => {
  res.status(200).json({ message: "JSON válido para esquema de producto" });
});

app.post("/validar-usuario", validateSchema("usuario"), (req, res) => {
  res.status(200).json({ message: "JSON válido para esquema de usuarios" });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});