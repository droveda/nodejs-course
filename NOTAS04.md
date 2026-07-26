# Dynamic Content & Templates


## Available Templating Engines
* EJS (This is the choice during the course)
  * `<p><%= name %></p>`
  * use normal HTML and plain JavaScript in your templates
* Pug (Jade)
  * `p #{name}`
  * Use minimal HTML and custom template language
  * https://pugjs.org/api/getting-started.html
* Handlebars
  * `<p>{{ name }}</p>`
  * Use normal HTML and custom template language

## Installing
* npm install --save ejs pug express-handlebars


## Handlebars - Avoind an Error
In the next lecture, we'll have a look at a different view engine: Handlebars.  

Due to a (temporary) breaking change introduced by the library authors (of the package we'll install in the next lecture), make sure you run `npm install --save express-handlebars@3.0` before you start using that package in the next lecture.  


# Useful resources:

* Pug Docs: https://pugjs.org/api/getting-started.html
* Handlebars Docs: https://handlebarsjs.com/
* EJS Docs: http://ejs.co/#docs

# MVC
* Separation of Concerns
  * Model
    * Represent your data in your code
    * Work with your data (ee.g save, fetch, etc...)
  * Views
    * What the users sees
    * Decoupled from your application code
  * Controllers
    * Connecting your models and your views
    * Contains the "in-between" logic

# Database
* npm install --save pg

```sql
CREATE TABLE products (
	id serial4 NOT NULL,
	title varchar(255) NOT NULL,
	price float8 NOT NULL,
	description varchar(255) NOT NULL,
	imageurl varchar(255) NOT NULL,
	CONSTRAINT products_pkey PRIMARY KEY (id)
);
```

## Sequalize
* Focus on Node.js not on SQL
* Sequelize is An Object Relacional Mapping Library (ORM)
* npm install --save sequelize pg
* Sequelize Official Docs: http://docs.sequelizejs.com/

```javaScript
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nodejs-course', 'postgres', 'admin', {
  host: 'localhost',
  dialect: 'postgres',
});
```

