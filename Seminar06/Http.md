# HTTP: A Quick Introduction

## What is HTTP?
HTTP (Hypertext Transfer Protocol) is an application-layer protocol that powers the web. It follows a **client–server** model: a client (usually a browser or another program) sends a **request** to a server, and the server returns a **response**.

## Client–Server Architecture and URLs
Every resource on the web lives on a server and can be accessed by clients through a URL (Uniform Resource Locator).

**General URL structure:**
[protocol]://[domain]/[path/to/resource?param1=value1&param2=value2]

**Example:**
https://wikipedia.org/wiki/World_Wide_Web

## HTTP Request Methods
Common HTTP methods describe the action a client asks the server to perform:

- **GET** — Retrieve data (no body changes on the server).
- **POST** — Create a new resource on the server.
- **PUT** — Fully replace an existing resource.
- **DELETE** — Remove a resource.

## HTTP Status Codes
Every response includes a **status code** indicating the outcome. Codes are grouped into five categories:

- **1xx – Informational**: Request received, continuing process.
- **2xx – Success**: The action was successfully received, understood, and accepted.  
  Examples: 200 OK, 201 Created, 204 No Content
- **3xx – Redirection**: Further action needs to be taken to complete the request.  
  Examples: 301 Moved Permanently, 302 Found, 304 Not Modified
- **4xx – Client Error**: The request has a problem (often on the client side).  
  Examples: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found
- **5xx – Server Error**: The server failed to fulfill a valid request.  
  Examples: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable

## Request–Response Lifecycle (High Level)
1. The **client** constructs a request (method, URL, headers, optional body) and sends it to the server.
2. The **server** processes the request (routing, validation, business logic, data access).
3. The **server** returns a **response** (status code, headers, optional body).
4. The **client** interprets the response; on success it may render data, and on errors it can retry, redirect, or show messages.

## Minimal Example

**Request**
GET /api/movies?genre=sci-fi HTTP/1.1
Host: example.com
Accept: application/json

**Response**
HTTP/1.1 200 OK
Content-Type: application/json
[
    { "id": 1, "title": "Interstellar" },
    { "id": 2, "title": "The Matrix" }
]