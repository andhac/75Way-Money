import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import { OpenAPIV3 } from "openapi-types";

const swaggerDocument: OpenAPIV3.Document = {
    openapi: "3.0.0",
    info: {
        title: "Money Transfer API",
        description: "API for user management and money transactions",
        version: "1.0.0"
    },
    servers: [
        {
            url: "http://localhost:5000/api"
        }
    ],
    paths: {
        "/register": {
            post: {
                summary: "Register a new user",
                tags: ["User"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/User"
                            }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "User registered successfully"
                    }
                }
            }
        },
        "/login": {
            post: {
                summary: "User login",
                tags: ["User"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: {
                                        type: "string"
                                    },
                                    password: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Login successful"
                    }
                }
            }
        },
        "/adminLogin": {
            post: {
                summary: "Admin login",
                tags: ["Admin"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    email: {
                                        type: "string"
                                    },
                                    password: {
                                        type: "string"
                                    }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Admin login successful"
                    }
                }
            }
        },
        "/refreshToken": {
            post: {
                summary: "Refresh access token",
                tags: ["User"],
                responses: {
                    "200": {
                        description: "Token refreshed"
                    }
                }
            }
        },
        "/logout": {
            post: {
                summary: "Logout user",
                tags: ["User"],
                responses: {
                    "200": {
                        description: "Logged out successfully"
                    }
                }
            }
        },
        "/getAllUser": {
            get: {
                summary: "Get all users",
                tags: ["Admin"],
                responses: {
                    "200": {
                        description: "List of users"
                    }
                }
            }
        },
        "/getUserById/{id}": {
            get: {
                summary: "Get user by ID",
                tags: ["User"],
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "User details"
                    }
                }
            }
        },
        "/profile": {
            get: {
                summary: "Get user profile",
                tags: ["User"],
                responses: {
                    "200": {
                        description: "User profile data"
                    }
                }
            }
        },
        "/withdrawal": {
            post: {
                summary: "Request withdrawal",
                tags: ["User"],
                responses: {
                    "200": {
                        description: "Withdrawal request submitted"
                    }
                }
            }
        },
        "/approveFund/{transactionId}": {
            post: {
                summary: "Approve funding transaction",
                tags: ["Admin"],
                parameters: [
                    {
                        name: "transactionId",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "Transaction approved"
                    }
                }
            }
        },
        "/approveTransfer/{transactionId}": {
            post: {
                summary: "Approve user transfer",
                tags: ["Admin"],
                parameters: [
                    {
                        name: "transactionId",
                        in: "path",
                        required: true,
                        schema: {
                            type: "string"
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "Transfer approved"
                    }
                }
            }
        },
        "/addFund": {
            post: {
                summary: "Add funds to wallet",
                tags: ["Wallet"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    amount: { type: "number" },
                                    currency: { type: "string" }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": { description: "Funds added successfully" }
                }
            }
        },
        "/getBalance": {
            get: {
                summary: "Get wallet balance",
                tags: ["Wallet"],
                responses: {
                    "200": { description: "Wallet balance details" }
                }
            }
        },
        "/transferFund": {
            post: {
                summary: "Transfer funds between users",
                tags: ["Wallet"],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                type: "object",
                                properties: {
                                    receiverId: { type: "string" },
                                    amount: { type: "number" },
                                    currency: { type: "string" }
                                }
                            }
                        }
                    }
                },
                responses: {
                    "200": { description: "Transfer successful" }
                }
            }
        },
        "/history": {
            get: {
                summary: "Get transaction history",
                tags: ["Transaction"],
                responses: {
                    "200": { description: "Transaction history details" }
                }
            }
        }
    },
    components: {
        schemas: {
            User: {
                type: "object",
                properties: {
                    fullName: {
                        type: "string"
                    },
                    email: {
                        type: "string"
                    },
                    password: {
                        type: "string"
                    },
                    phone: {
                        type: "string"
                    },
                    role: {
                        type: "string",
                        enum: ["USER", "ADMIN"]
                    },
                    walletBalance: {
                        type: "number",
                        default: 0
                    },
                    currency: {
                        type: "string",
                        default: "INR"
                    }
                }
            },
            Wallet: {
                type: "object",
                properties: {
                    user: { type: "string" },
                    balance: { type: "number", default: 0 },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" }
                }
            },
            Transaction: {
                type: "object",
                properties: {
                    senderId: { type: "string" },
                    receiverId: { type: "string" },
                    type: { type: "string", enum: ["WITHDRAWAL", "DEPOSIT", "TRANSFER"] },
                    status: { type: "string", enum: ["PENDING", "COMPLETED", "FAILED"] },
                    amount: { type: "number" },
                    currency: { type: "string" },
                    createdAt: { type: "string", format: "date-time" },
                    updatedAt: { type: "string", format: "date-time" }
                }
            }
        }
    }
};

export function setupSwagger(app: Express) {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}
