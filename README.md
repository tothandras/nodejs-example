# nodejs-example

This is a simple Node.js example project with generic types of functionalities that are likely to be part of an arbitrary real-life Node.js project.

The application is primarily intended to be used in conjunction with the Banzai Cloud's Pipeline CI/CD flow, to demonstrate the benefits of enabling the flow in case of an arbitrary Node.js application


# What is the application capable of

The application is capable of basic CRUD operations related to an imaginary user.
Users are stored in a database (external) to the application.

Besides the imaginary user CRUD API, the application also exposes an endpoint for health retrieval on the same port.

Metrics information are exposed on a separate port.

# Application image

The project contains a docker file that describes how the application is "containerized" 

