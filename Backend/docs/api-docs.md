# ReWear API Documentation

## Authentication
- `POST /api/auth/register`: Register user
- `POST /api/auth/login`: Login user
- `GET /api/auth/profile`: Get user profile (Protected)

## Users
- `PUT /api/users/profile`: Update user profile (Protected)
- `GET /api/users/points`: Get user RWP, exchanges, and sustainability score (Protected)

## Items
- `GET /api/items`: Get all available items
- `GET /api/items/:id`: Get single item
- `POST /api/items`: Upload new item (Protected)
- `DELETE /api/items/:id`: Delete item (Protected)

## Exchange
- `POST /api/exchange/request`: Request an exchange (Protected)
- `POST /api/exchange/accept`: Accept an exchange (Protected)
- `POST /api/exchange/reject`: Reject an exchange (Protected)
- `POST /api/exchange/complete`: Complete an exchange (Protected)

## Admin
- `GET /api/admin/users`: Get all users (Admin only)
- `GET /api/admin/items`: Get all items (Admin only)
- `GET /api/admin/exchanges`: Get all exchanges (Admin only)
- `PUT /api/admin/approve-item/:id`: Approve item (Admin only)
- `PUT /api/admin/reject-item/:id`: Reject item (Admin only)
