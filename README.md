# Person Resource API

This is a simple REST API for managing person resources. It allows you to perform CRUD (Create, Read, Update, Delete) operations on person records. The API is built using Node.js, Express.js, and MongoDB.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Creating a Person](#creating-a-person)
    -[Response]
  - [Retrieving a Person](#retrieving-a-person)
    -[Response]
  - [Updating a Person](#updating-a-person)
    -[Response]
  - [Deleting a Person](#deleting-a-person)
    -[Response]
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm installed on your machine.
- MongoDB installed and running locally or an atlas connection to a MongoDB instance.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/GodsentMichael/HNG-backend-tasks.git

2. Change into the project directory:

   ```bash
   cd HNG-backend-tasks

3. Install the dependencies:

    ```bash
    npm install

4. Set up environment variables by creating a .env file in the root directory with the following content:

    ```bash
    MONGODB_URI=your-mongodb-connection-string
    PORT=8001

5. Start the server:

    ```bash
    npm run dev

 ## The API should now be running at http://localhost:8001.

## Usage

### Creating a Person

- To create a new person, make a POST request to the /api/ endpoint with the following JSON body:

    ```bash
    {
  "name": "John Doe",
  "age": 30,
  "phone": "1234567890",
  "address": "123 Main St",
  "email": "johndoe@example.com"
}

- Response

    ```bash
    {
    "name": "John Doe",
    "id": "6501a3e823d01ba6484659bd"
}


### Retrieving a Person

- To retrieve a person by name, make a GET request to the /api/:name endpoint, replacing :name with the person's name.

- Response

    ```bash
    {
    "name": "John Doe",
    "id": "6501a3e823d01ba6484659bd"
}


### Updating a Person

- To update a person's information, make a PUT request to the /api/:name endpoint, replacing :name with the person's name. Include the fields you want to update in the request body:

    ```bash
    {
  "age": 35,
  "phone": "9876543210",
  "address": "456 Elm St"
}

- Response

    ```bash
    {
    "id": "6501a3e823d01ba6484659bd",
    "age": "21",
    "phone": "9876543210"
    "address": "456 Elm St"
}

### Deleting a Person

- To delete a person by name, make a DELETE request to the /api/:name endpoint, replacing :name with the person's name.

- Response

    ```bash
    {
    "message": "Person deleted succesfully"
}

## API Endpoints

- POST /api/: Create a new person.
- GET /api/:name: Retrieve a person by name.
- PUT /api/:name: Update a person's information by name.
- DELETE /api/:name: Delete a person by name.


## Testing

- I used Jest and supertest to run automated tests by running the following command:

    ```bash
    npm run test                                                                                                                                               

## Contributing

- Contributions are welcome! Feel free to open issues or submit pull requests to improve this project.

## License

- This project is licensed under the MIT License.


