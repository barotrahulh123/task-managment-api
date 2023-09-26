# task-management-api
This is a task management api to manage user tasks


## Getting Started

Install the dependencies
```bash
npm i
```

Set the environment variables
```bash
cp .env.example .env
```
## Commands for create database  
```bash
# Creates the database
sequelize db:create 

# Load migrations
sequelize db:migrate 

# Load demo data
sequelize db:seed:all
```

Running the server:
```bash
nom run dev
```

Postman collection of api (import in Postman):
```bash
task-managment-api.postman_collection.json
```

## Configuration

Variables for the environment

| Option | Description |
| ------ | ------ |
| SERVER_PORT | Port the server will run on |
| NODE_ENV | development or production |
| SERVER_JWT | true or false |
| SERVER_JWT_SECRET | JWT secret |
| SERVER_JWT_TIMEOUT | JWT duration time |
| DB_DIALECT | "mysql", "postgresql", among others |
| DB_HOST | Database host |
| DB_USER | Database username |
| DB_PASS | Database password |
| DB_NAME | Database name |

# for future scope
| AWS_KEYID | Access key ID |
| AWS_SECRETKEY | User secret key |
| AWS_BUCKET | Bucket name |

## Commands for sequelize 
```bash
# Creates the database
sequelize db:create 

# Drops the database
sequelize db:drop 

# Load migrations
sequelize db:migrate 

# Undo migrations
sequelize db:migrate:undo:all 

# Load seeders
sequelize db:seed:all
```




<h5 align="center">
   Thank You
</h5>
