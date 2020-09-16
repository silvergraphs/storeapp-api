# Full Stack Store App

This application tries to imitate the Google Play Store, showing a list of applications and categories, where you can register as a user or developer.

As user you can see every app created by an developer and you can buy apps.

As developer you can see every app and your uploaded/developed apps.

This app is created for learn purposes, i learn while developing 📘

## Installation ⚡

Clone the repository, install dependencies, configure MySQL connection and run the server.

```bash
npm install
npm start
```

## Requirements

The only requirement is a MySQL server with a database called `store`, the app creates all the databases automatically.

## API Docs 🐺

#### Users

#### `POST /api/user` - Create new user

- Requires: `name` , `email` , `userType` (user/developer)

#### `GET /api/user` - Get all users

- Without requirements

#### `GET /api/user/id` - Get specific user from id

- Requires: `:userId`

#### `PUT /api/user/id` - Update specific user from id

- Requires: `:userId` , `name` , `email`

#### `DELETE /api/user/id` - Delete specific user from id

- Requires: `:userId`

---

#### Categories

#### `POST /api/category` - Create new category

- Requires: `name`

#### `GET /api/category` - Get all categories

- Without requirements

#### `GET /api/category/id` - Get specific category from id

- Requires: `:categoryId`

#### `PUT /api/category/id` - Update specific category from id

- Requires: `:categoryId`, `name`

#### `DELETE /api/category/id` - Delete specific category from id

- Requires: `:categoryId`

---

#### Applications

#### `POST /api/app` - Create new application

- Requires: `name` , `price` , `logo` (URL) , `Category_id`, `User_id`

#### `GET /api/app` - Get all applications

- Without requirements

#### `GET /api/app/id` - Get specific application from id

- Requires: `:appId`

#### `PUT /api/app/id` - Update specific application from id

- Requires: `:appId`, `price` , `logo` (URL)

#### `DELETE /api/app/id` - Delete specific application from id

- Requires: `:appId`

## Contributing 👍

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change
