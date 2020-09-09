# Full Stack Store App

This application tries to imitate the Google Play Store, showing a list of applications and categories, where you can register as a user or developer.

As user you can see every app created by an developer and you can buy apps.

As developer you can see every app and your uploaded/developed apps.

This app is created for learn purposes 📘

## Installation ⚡

Clone the repository, install dependencies, and run the server.

```bash
npm install
npm start
```

## API Docs 🐺

#### Users

`POST /api/user/` - Create new user

`GET /api/user/` - Get all users

`GET /api/user/id` - Get specific user from id

`PUT /api/user/` - Updates user data

`DELETE /api/user/id` - Deletes specific user from id

#### Categories

`POST /api/category/` - Create new category

`GET /api/category/` - Get all categories

`GET /api/category/id` - Get specific category from id

`PUT /api/category/` - Updates category data

`DELETE /api/category/id` - Deletes specific category from id

#### Applications

`POST /api/app/` - Create new application

`GET /api/app/` - Get all applications

`GET /api/app/id` - Get specific application from id

`PUT /api/app/` - Updates application data

`DELETE /api/app/id` - Deletes specific application from id

## Contributing 👍

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change
