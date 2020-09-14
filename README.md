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

`POST /api/user` - Create new user

`GET /api/user` - Get all users

`GET /api/user/id` - Get specific user from id

`PUT /api/user/id` - Update specific user from id

`DELETE /api/user/id` - Delete specific user from id

#### Categories

`POST /api/category` - Create new category

`GET /api/category` - Get all categories

`GET /api/category/id` - Get specific category from id

`PUT /api/category/id` - Update specific category from id

`DELETE /api/category/id` - Deletes specific category from id

#### Applications

`POST /api/app` - Create new application

`GET /api/app` - Get all applications

`GET /api/app/id` - Get specific application from id

`PUT /api/app/id` - Update specific application from id

`DELETE /api/app/id` - Delete specific application from id

## Contributing 👍

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change
