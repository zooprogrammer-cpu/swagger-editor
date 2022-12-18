/* eslint-disable no-param-reassign */

function baseOpenAPI(tailored) {
  return {
    openapi: '3.0.3',
    info: {
      title: tailored.title,
      version: tailored.version,
      description: `${tailored.description} [generated from code]`,
    },
    paths: {},
    components: {
      schemas: {},
    },
  };
}

function buildSchemas(openapi, tailored) {
  tailored.resources.forEach((resource) => {
    const collectionSchemaName = `${resource.name}-collection`;
    const itemSchemaName = `${resource.name}-item`;

    const itemProperties = Object.keys(resource.properties).reduce((result, propertyName) => {
      const propertyType = resource.properties[propertyName];
      result[propertyName] = {
        type: propertyType,
      };
      return result;
    }, {});

    itemProperties.id = { type: 'string' };

    openapi.components.schemas[itemSchemaName] = {
      type: 'object',
      properties: itemProperties,
    };

    openapi.components.schemas[collectionSchemaName] = {
      type: 'object',
      properties: {
        items: {
          type: 'array',
          items: {
            $ref: `#/components/schemas/${itemSchemaName}`,
          },
        },
      },
    };
  });
}

function ensurePathItem(openapi, url) {
  if (!openapi.paths[url]) {
    openapi.paths[url] = {};
  }
}
function buildOperations(openapi, tailored) {
  tailored.resources.forEach((resource) => {
    const pluralResourceName = `${resource.name}s`;
    const idParameterName = `${resource.name}_id`;
    const collectionURL = `/${pluralResourceName}`;
    const itemUrl = `/${pluralResourceName}/{${idParameterName}}`;

    if (resource.operations.includes('list')) {
      ensurePathItem(openapi, collectionURL);

      openapi.paths[collectionURL].get = {
        operationId: `list-${pluralResourceName}`,
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: `#/components/schemas/${resource.name}-collection`,
                },
              },
            },
          },
        },
      };
    }

    if (resource.operations.includes('retrieve')) {
      ensurePathItem(openapi, itemUrl);

      openapi.paths[itemUrl].get = {
        operationId: `retrieve-${resource.name}`,
        parameters: [
          {
            name: idParameterName,
            in: 'path',
            schema: {
              type: 'string',
            },
            required: true,
          },
        ],
        responses: {
          200: {
            description: 'Successful response',
            content: {
              'application/json': {
                schema: {
                  $ref: `#/components/schemas/${resource.name}-item`,
                },
              },
            },
          },
        },
      };
    }
  });
}

export default function generateOpenAPI(tailored) {
  const openapi = baseOpenAPI(tailored);

  buildSchemas(openapi, tailored);
  buildOperations(openapi, tailored);
  return openapi;
}
