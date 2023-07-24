# K-Link Assignment

### Requirement
php8.1^


- Clone the repository
```
git clone https://github.com/SaiWinOo/k-link-assignment.git
```
- Then install packages for backend
```
cd backend && composer install && npm install
```
- Install packages for frontend

```
cd frontend && npm install
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
Run server
```
cd backend && php artisan serve
```
Run frontend
```
cd frontend &&  npm run dev
```

This is API collection

https://drive.google.com/file/d/1WU6S0ptUXo7HWy5L6HiL8hLjRiaFuyZk/view?usp=sharing