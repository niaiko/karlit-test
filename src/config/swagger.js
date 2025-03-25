module.exports = {
  openapi: "3.0.0",
  info: {
    title: "Accounting API",
    version: "1.0.0",
    description: "API pour la gestion des clients et de leurs bilans comptables",
    contact: {
      name: "Support API",
      email: "niaikorakoto1001@gmail.com",
    },
    license: {
      name: "ISC",
      url: "https://opensource.org/licenses/ISC",
    },
  },
  servers: [
    {
      url: "/api",
      description: "Serveur API",
    },
  ],
  tags: [
    {
      name: "Clients",
      description: "Opérations liées aux clients",
    },
    {
      name: "Bilans comptables",
      description: "Opérations liées aux bilans comptables",
    },
    {
      name: "Système",
      description: "Opérations système et utilitaires",
    },
  ],
  paths: {
    "/clients": {
      get: {
        tags: ["Clients"],
        summary: "Récupérer tous les clients",
        description: "Renvoie la liste de tous les clients enregistrés dans le système",
        operationId: "getAllClients",
        responses: {
          200: {
            description: "Liste des clients récupérée avec succès",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/Client",
                  },
                },
              },
            },
          },
          500: {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      post: {
        tags: ["Clients"],
        summary: "Créer un nouveau client",
        description: "Crée un nouveau client avec les informations fournies",
        operationId: "createClient",
        requestBody: {
          description: "Informations du client à créer",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ClientInput",
              },
              examples: {
                client: {
                  summary: "Exemple de client",
                  value: {
                    firstName: "Jean",
                    lastName: "Dupont",
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Client créé avec succès",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Client",
                },
              },
            },
          },
          400: {
            description: "Données invalides",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/clients/{id}": {
      get: {
        tags: ["Clients"],
        summary: "Récupérer un client par ID",
        description: "Renvoie les détails d'un client spécifique",
        operationId: "getClientById",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID du client à récupérer",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          200: {
            description: "Client récupéré avec succès",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Client",
                },
              },
            },
          },
          404: {
            description: "Client non trouvé",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      put: {
        tags: ["Clients"],
        summary: "Mettre à jour un client",
        description: "Met à jour les informations d'un client existant",
        operationId: "updateClient",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID du client à mettre à jour",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        requestBody: {
          description: "Informations du client à mettre à jour",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/ClientInput",
              },
              examples: {
                client: {
                  summary: "Exemple de mise à jour",
                  value: {
                    firstName: "Jean",
                    lastName: "Martin",
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Client mis à jour avec succès",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Client",
                },
              },
            },
          },
          400: {
            description: "Données invalides",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Client non trouvé",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Clients"],
        summary: "Supprimer un client",
        description: "Supprime un client existant et tous ses bilans comptables associés",
        operationId: "deleteClient",
        parameters: [
          {
            name: "id",
            in: "path",
            description: "ID du client à supprimer",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          204: {
            description: "Client supprimé avec succès",
          },
          404: {
            description: "Client non trouvé",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/balance-sheets": {
      post: {
        tags: ["Bilans comptables"],
        summary: "Créer un nouveau bilan comptable",
        description: "Crée un nouveau bilan comptable pour un client et une année spécifiques",
        operationId: "createBalanceSheet",
        requestBody: {
          description: "Informations du bilan comptable à créer",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/BalanceSheetInput",
              },
              examples: {
                balanceSheet: {
                  summary: "Exemple de bilan comptable",
                  value: {
                    clientId: 1,
                    year: 2023,
                    result: 125000.5,
                  },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Bilan comptable créé avec succès",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BalanceSheet",
                },
              },
            },
          },
          400: {
            description: "Données invalides ou bilan comptable déjà existant pour cette année",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Client non trouvé",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/balance-sheets/client/{clientId}": {
      get: {
        tags: ["Bilans comptables"],
        summary: "Récupérer tous les bilans comptables d'un client",
        description: "Renvoie tous les bilans comptables pour un client spécifique",
        operationId: "getBalanceSheetsByClientId",
        parameters: [
          {
            name: "clientId",
            in: "path",
            description: "ID du client",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
        ],
        responses: {
          200: {
            description: "Bilans comptables récupérés avec succès",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: {
                    $ref: "#/components/schemas/BalanceSheet",
                  },
                },
              },
            },
          },
          404: {
            description: "Client non trouvé",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/balance-sheets/client/{clientId}/year/{year}": {
      put: {
        tags: ["Bilans comptables"],
        summary: "Mettre à jour un bilan comptable",
        description: "Met à jour le bilan comptable d'un client pour une année spécifique",
        operationId: "updateBalanceSheet",
        parameters: [
          {
            name: "clientId",
            in: "path",
            description: "ID du client",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
          {
            name: "year",
            in: "path",
            description: "Année du bilan comptable",
            required: true,
            schema: {
              type: "integer",
              minimum: 1900,
              maximum: 2100,
            },
          },
        ],
        requestBody: {
          description: "Informations du bilan comptable à mettre à jour",
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/BalanceSheetUpdateInput",
              },
              examples: {
                balanceSheet: {
                  summary: "Exemple de mise à jour de bilan",
                  value: {
                    result: 135000.75,
                  },
                },
              },
            },
          },
        },
        responses: {
          200: {
            description: "Bilan comptable mis à jour avec succès",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/BalanceSheet",
                },
              },
            },
          },
          400: {
            description: "Données invalides",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          404: {
            description: "Bilan comptable non trouvé",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ["Bilans comptables"],
        summary: "Supprimer un bilan comptable",
        description: "Supprime le bilan comptable d'un client pour une année spécifique",
        operationId: "deleteBalanceSheet",
        parameters: [
          {
            name: "clientId",
            in: "path",
            description: "ID du client",
            required: true,
            schema: {
              type: "integer",
              format: "int64",
            },
          },
          {
            name: "year",
            in: "path",
            description: "Année du bilan comptable",
            required: true,
            schema: {
              type: "integer",
              minimum: 1900,
              maximum: 2100,
            },
          },
        ],
        responses: {
          204: {
            description: "Bilan comptable supprimé avec succès",
          },
          404: {
            description: "Bilan comptable non trouvé",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
          500: {
            description: "Erreur serveur",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/Error",
                },
              },
            },
          },
        },
      },
    },
    "/health": {
      get: {
        tags: ["Système"],
        summary: "Vérifier l'état de l'API",
        description: "Renvoie l'état de l'API pour les vérifications de santé",
        operationId: "healthCheck",
        responses: {
          200: {
            description: "API en bon état de fonctionnement",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "ok",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
    "/db-check": {
      get: {
        tags: ["Système"],
        summary: "Vérifier la connexion à la base de données",
        description: "Vérifie si la connexion à la base de données est établie",
        operationId: "dbCheck",
        responses: {
          200: {
            description: "Connexion à la base de données établie",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "connected",
                    },
                    message: {
                      type: "string",
                      example: "Database connection successful",
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Échec de la connexion à la base de données",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    status: {
                      type: "string",
                      example: "error",
                    },
                    message: {
                      type: "string",
                      example: "Database connection failed",
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      Client: {
        type: "object",
        properties: {
          id: {
            type: "integer",
            format: "int64",
            description: "Identifiant unique du client",
            example: 1,
          },
          firstName: {
            type: "string",
            description: "Prénom du client",
            example: "Jean",
          },
          lastName: {
            type: "string",
            description: "Nom de famille du client",
            example: "Dupont",
          },
        },
      },
      ClientInput: {
        type: "object",
        required: ["firstName", "lastName"],
        properties: {
          firstName: {
            type: "string",
            description: "Prénom du client",
            example: "Jean",
            maxLength: 100,
          },
          lastName: {
            type: "string",
            description: "Nom de famille du client",
            example: "Dupont",
            maxLength: 100,
          },
        },
      },
      BalanceSheet: {
        type: "object",
        properties: {
          clientId: {
            type: "integer",
            format: "int64",
            description: "Identifiant du client",
            example: 1,
          },
          year: {
            type: "integer",
            description: "Année du bilan comptable",
            example: 2023,
            minimum: 1900,
            maximum: 2100,
          },
          result: {
            type: "number",
            format: "float",
            description: "Résultat financier du bilan",
            example: 125000.5,
          },
        },
      },
      BalanceSheetInput: {
        type: "object",
        required: ["clientId", "year", "result"],
        properties: {
          clientId: {
            type: "integer",
            format: "int64",
            description: "Identifiant du client",
            example: 1,
          },
          year: {
            type: "integer",
            description: "Année du bilan comptable",
            example: 2023,
            minimum: 1900,
            maximum: 2100,
          },
          result: {
            type: "number",
            format: "float",
            description: "Résultat financier du bilan",
            example: 125000.5,
          },
        },
      },
      BalanceSheetUpdateInput: {
        type: "object",
        required: ["result"],
        properties: {
          result: {
            type: "number",
            format: "float",
            description: "Résultat financier du bilan",
            example: 135000.75,
          },
        },
      },
      Error: {
        type: "object",
        properties: {
          error: {
            type: "string",
            description: "Message d'erreur",
            example: "Client with id 999 not found",
          },
          message: {
            type: "string",
            description: "Détails supplémentaires (uniquement en mode développement)",
            example: "Error details for debugging",
          },
        },
      },
    },
  },
}

