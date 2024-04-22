# Prisma-Books 📖🔤🔖

This repository contains the source code and examples for a school lesson focused on implementing and querying nested SQL data structures using Prisma. The project demonstrates the setup and execution of various API endpoints in a Node.js environment, facilitating operations on entities such as authors, books, and publishers.

## Technologies Used

- **Node.js**: Server-side JavaScript runtime environment.
- **Prisma**: Next-generation ORM for Node.js and TypeScript, used for efficient database management with strong typing and easy data access patterns.
- **Express**: Web application framework for Node.js, used to build our API endpoints.

## Request Call Hierarchy

Outlined below is the call hierarchy for the API endpoints, showing the path from the server entry point down to specific routes and controllers.

## `GET /publishers/1`

```text
server.ts
>    app.ts
    >    routes/index.ts
            "/authors"      -> routes/authors.ts
            "/books"        -> routes/books.ts
        >   "/publishers"   -> routes/publishers.ts
                "GET /"                -> controllers/publisher_controller.ts@index
            >   "GET /:publisherId"    -> controllers/publisher_controller.ts@show
                "POST /"               -> controllers/publisher_controller.ts@store
```

## Endpoints

### Authors

#### `GET /authors`

##### _`GET /authors/:authorId`_

Get author details.

##### `GET /authors/:authorId/books`

Get all books the author has written.

#### `POST /authors/:authorId/books`

Add a book to a author.

```json
{
  "bookId": 2
}
```

### `POST /authors`

```json
{
  "name": "Sir Arthur C. Clarke"
}
```

### Books

#### `GET /books`

#### `POST /books`

```json
{
  "title": "Hyperion",
  "pages": 481,
  "publisherId": 1
}
```

### User

##### `POST /register`

Register a new user.

```json
{
  "name": "Alan Moore",
  "email": "alan_moore@moonandserpent.com",
  "password": "abc123"
}
```

#### `GET /profile`

Get the authenticated user information.

```json
{
  "id": 1,
  "name": "Alan Moore",
  "email": "alan_moore@moonandserpent.com"
}
```

#### `GET /profile/books`

Get the authenticated user's books.

```json
[{}, {}, {}]
```

```json
{
  "info": {
    "_postman_id": "6de91583-c172-4155-ab37-aadbf31173b8",
    "name": "Books",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
    "_exporter_id": "542474"
  },
  "item": [
    {
      "name": "Authors",
      "item": [
        {
          "name": "/authors",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:3000/authors",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["authors"]
            }
          },
          "response": []
        },
        {
          "name": "/authors/:authorId",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:3000/authors/1",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["authors", "1"]
            }
          },
          "response": []
        },
        {
          "name": "/authors",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n\t\"name\": \"George Martin\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:3000/authors",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["authors"]
            }
          },
          "response": []
        },
        {
          "name": "/authors/:authorId/books",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n\t\"bookId\": 5\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:3000/authors/6/books",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["authors", "6", "books"]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Books",
      "item": [
        {
          "name": "/books",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:3000/books",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["books"]
            }
          },
          "response": []
        },
        {
          "name": "/books/:bookId",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:3000/books/2",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["books", "2"]
            }
          },
          "response": []
        },
        {
          "name": "/books",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n\t\"title\": \"Det är stabilt\",\n\t\"pages\": 1,\n\t\"publisherId\": 4\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:3000/books",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["books"]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Publishers",
      "item": [
        {
          "name": "GET /publishers",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:3000/publishers",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["publishers"]
            }
          },
          "response": []
        },
        {
          "name": "GET /publishers/:publisherId",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:3000/publishers/1",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["publishers", "1"]
            }
          },
          "response": []
        },
        {
          "name": "POST /publishers",
          "request": {
            "method": "POST",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n\t\"name\": \"Hutchinson\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:3000/publishers",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["publishers"]
            }
          },
          "response": []
        },
        {
          "name": "PATCH /publishers/:publisherId",
          "request": {
            "method": "PATCH",
            "header": [],
            "body": {
              "mode": "raw",
              "raw": "{\n\t\"name\": \"Hutchinson\"\n}",
              "options": {
                "raw": {
                  "language": "json"
                }
              }
            },
            "url": {
              "raw": "http://localhost:3000/publishers/1",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["publishers", "1"]
            }
          },
          "response": []
        },
        {
          "name": "DELETE /publishers/:publisherId",
          "request": {
            "method": "DELETE",
            "header": [],
            "url": {
              "raw": "http://localhost:3000/publishers/3",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["publishers", "3"]
            }
          },
          "response": []
        }
      ]
    },
    {
      "name": "Profile (jn) Basic",
      "item": [
        {
          "name": "GET /profile",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:3000/profile",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["profile"]
            }
          },
          "response": []
        }
      ],
      "auth": {
        "type": "basic",
        "basic": [
          {
            "key": "password",
            "value": "abc123",
            "type": "string"
          },
          {
            "key": "username",
            "value": "alanmoore@moonandtheserpent.com",
            "type": "string"
          }
        ]
      },
      "event": [
        {
          "listen": "prerequest",
          "script": {
            "type": "text/javascript",
            "exec": [""]
          }
        },
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [""]
          }
        }
      ]
    },
    {
      "name": "Profile (jn) JWT",
      "item": [
        {
          "name": "GET /profile",
          "request": {
            "auth": {
              "type": "bearer",
              "bearer": [
                {
                  "key": "token",
                  "value": "{{access_token}}",
                  "type": "string"
                }
              ]
            },
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:3000/profile",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["profile"]
            }
          },
          "response": []
        }
      ],
      "auth": {
        "type": "bearer",
        "bearer": [
          {
            "key": "token",
            "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJKb2hhbiBOb3Jkc3Ryw7ZtIiwiZW1haWwiOiJqbkB0aGVoaXZlcmVzaXN0YW5jZS5jb20iLCJpYXQiOjE2NzU5MzAyOTYsImV4cCI6MTY3NTkzMDM1Nn0.8-PHsg5Ra1g7z6usRL9V7XfeK3sO2SvUbphjGVCW54E",
            "type": "string"
          }
        ]
      },
      "event": [
        {
          "listen": "prerequest",
          "script": {
            "type": "text/javascript",
            "exec": [""]
          }
        },
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [""]
          }
        }
      ]
    },
    {
      "name": "Profile (ts) Basic",
      "item": [
        {
          "name": "GET /profile",
          "request": {
            "method": "GET",
            "header": [],
            "url": {
              "raw": "http://localhost:3000/profile",
              "protocol": "http",
              "host": ["localhost"],
              "port": "3000",
              "path": ["profile"]
            }
          },
          "response": []
        }
      ],
      "auth": {
        "type": "basic",
        "basic": [
          {
            "key": "password",
            "value": "abc123",
            "type": "string"
          },
          {
            "key": "username",
            "value": "ts@thehiveresistance.com",
            "type": "string"
          }
        ]
      },
      "event": [
        {
          "listen": "prerequest",
          "script": {
            "type": "text/javascript",
            "exec": [""]
          }
        },
        {
          "listen": "test",
          "script": {
            "type": "text/javascript",
            "exec": [""]
          }
        }
      ]
    },
    {
      "name": "GET /",
      "request": {
        "method": "GET",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": [""]
        }
      },
      "response": []
    },
    {
      "name": "POST /login (jn)",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"email\": \"alanmoore@moonandtheserpent.com\",\n  \"password\": \"abc123\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/login",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["login"]
        }
      },
      "response": []
    },
    {
      "name": "POST /refresh",
      "request": {
        "auth": {
          "type": "bearer",
          "bearer": [
            {
              "key": "token",
              "value": "{{refresh_token}}",
              "type": "string"
            }
          ]
        },
        "method": "POST",
        "header": [],
        "url": {
          "raw": "http://localhost:3000/refresh",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["refresh"]
        }
      },
      "response": []
    },
    {
      "name": "POST /register (jn)",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Alan Moore\",\n  \"email\": \"alanmoore@moonandtheserpent.com\",\n  \"password\": \"abc123\",\n  \"is_admin\": true\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/register",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["register"]
        }
      },
      "response": []
    },
    {
      "name": "POST /register (ts)",
      "request": {
        "method": "POST",
        "header": [],
        "body": {
          "mode": "raw",
          "raw": "{\n  \"name\": \"Grant Morrison\",\n  \"email\": \"grant_morrison@theracoon.com\",\n  \"password\": \"abc123\"\n}",
          "options": {
            "raw": {
              "language": "json"
            }
          }
        },
        "url": {
          "raw": "http://localhost:3000/register",
          "protocol": "http",
          "host": ["localhost"],
          "port": "3000",
          "path": ["register"]
        }
      },
      "response": []
    }
  ],
  "variable": [
    {
      "key": "access_token",
      "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJKb2hhbiBOb3Jkc3Ryw7ZtIiwiZW1haWwiOiJqbkB0aGVoaXZlcmVzaXN0YW5jZS5jb20iLCJpYXQiOjE2NzU5NDY4MjYsImV4cCI6MTY3NTk0NzEyNn0.i7IzEfHmfkSMK93Z96-N9aTQ_fYtdPXG9B_qW_HdItA"
    },
    {
      "key": "refresh_token",
      "value": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsIm5hbWUiOiJKb2hhbiBOb3Jkc3Ryw7ZtIiwiZW1haWwiOiJqbkB0aGVoaXZlcmVzaXN0YW5jZS5jb20iLCJpYXQiOjE2NzU5NDY4MjYsImV4cCI6MTY3NTk0NzcyNn0.-c7I03-Ds7y-jc-_KBBr7lDZuZrefAFRKmmjlnEUyII"
    }
  ]
}
```
