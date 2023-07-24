# K-Link Assignment

### Requirement
php8.1^


- Clone the repository
```
git clone https://github.com/SaiWinOo/k-link-assignment.git
```
- Then install packages for backend
```
cd k-link-assignment/backend && composer install && npm install
```
- Create a database
```
  mysql -u root
  create database klink;
  ```
Copy env file
```
cp .env.example .env
```
- Generate key
```
php artisan key:generate
```
- Link storage
```
php artisan storage:link
```

- Run migration

```angular2html
php artisan migrate --seed
```
- Run server

```angular2html
php artisan serve
```

- Install packages for frontend

```
cd ../frontend && npm install
```

Run frontend
```
  npm run dev
```

This is API collection

```angular2html
login info 
email : saiwinoo52@gmail.com
password : password
```

```angular2html
login info for api admin
email : admin@gmail.com
password : password
```

https://drive.google.com/file/d/1WU6S0ptUXo7HWy5L6HiL8hLjRiaFuyZk/view?usp=sharing