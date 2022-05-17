import { validationMetadatasToSchemas } from "class-validator-jsonschema";

import "./config.interface";

const schemas = validationMetadatasToSchemas();

const schema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  $ref: "#/definitions/ConfigInterface",
  definitions: schemas,
};

const schemaString = JSON.stringify(schema, null, 2);
console.log(schemaString);
