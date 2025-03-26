# Accounting API

A Node.js REST API for managing clients and their balance sheets.

## Features

- 📝 **CRUD operations for clients**: Create, read, update, and delete client records.
- 📊 **CRUD operations for balance sheets**: Manage financial data with ease.
- 🔍 **Duplicate client detection**: A script to identify and handle duplicate client entries.
- ✅ **Comprehensive testing**: Integration and unit tests to ensure reliability.
- 📖 **API documentation**: Swagger-powered documentation for easy API exploration.

## Tech Stack

- ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white) **Node.js & Express**: Backend framework.
- ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) **JavaScript**: Programming language.
- ![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white) **Sequelize ORM**: Database management.
- ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) **MySQL**: Relational database.
- ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white) **Jest**: Testing framework.
- ![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black) **Swagger**: API documentation.
- ![Winston](https://img.shields.io/badge/Winston-000000?style=for-the-badge&logo=nodedotjs&logoColor=white) **Winston**: Logging library.

## Project Structure

```
📂 project-root  
├── 📁 src  
│   ├── 📁 config            # API configurations (e.g., database, environment variables)  
│   ├── 📁 controllers       # API controllers to handle requests and responses  
│   ├── 📁 middlewares       # Custom middleware for request handling  
│   ├── 📁 models            # Sequelize models defining database schema  
│   ├── 📁 repositories      # Data access layer for interacting with the database  
│   ├── 📁 routes            # API routes mapping endpoints to controllers  
│   ├── 📁 scripts           # Utility scripts (e.g., duplicate detection)  
│   ├── 📁 services          # Business logic and reusable services  
│   ├── 📁 utils             # Utility functions and helpers  
│   └── app.js               # Main application file  
├── 📁 tests                 # Unit and integration tests  
├── 📄 package.json          # Project metadata and dependencies  
└── 📄 README.md             # Project documentation  
```

## Architecture

The project follows a **Model-View-Controller (MVC)** architecture:

- **Models**: Define the database schema and relationships using Sequelize.
- **Controllers**: Handle HTTP requests and responses.
- **Services**: Contain business logic to keep controllers lightweight.
- **Routes**: Define API endpoints and map them to controllers.

## Getting Started

1. Clone the repository:
    ```bash
    git clone https://github.com/niaiko/karlit-test.git
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up the database:
    Configure the database connection in `src/config/database.js`.

4. Start the server:
    ```bash
    npm start
    ```
5. Access the API documentation at `http://localhost:3000/api-docs`.

## Contributing

Contributions are welcome! Please follow the [contribution guidelines](CONTRIBUTING.md).

## License

This project is licensed under the [MIT License](LICENSE).