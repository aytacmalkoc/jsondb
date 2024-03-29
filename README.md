# 📖 jsondb

Easy, fast local database system with JSON.

[![npm downloads](https://img.shields.io/npm/dt/@aytacmalkoc/jsondb)](https://www.npmjs.com/package/@aytacmalkoc/jsondb)
[![npm version](https://badge.fury.io/js/@aytacmalkoc%2Fjsondb.svg)](https://badge.fury.io/js/@aytacmalkoc%2Fjsondb)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/aytacmalkoc/jsondb/blob/main/LICENSE)

[!["Buy Me A Coffee"](https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png)](https://www.buymeacoffee.com/aytacmalkoc)

# 🧧 Table of contents

- [📖 jsondb](#-jsondb)
  - [🙇‍♂️ Motivation](#-motivation)
  - [🔗 Installation](#-installation)
  - [👉 Usage](#-usage)
  - [⚙️ Methods](#-methods)
  - [🔗 Examples](#-examples)
  - [✏️ Formatting](#-formatting)
  - [🚀 Publish](#-publish)
  - [💁 License](#-license)

## 🙇‍♂️ Motivation
We may need a lightweight database when developing simple applications. We use local database packages to avoid having to connect to any database. That's why I wanted to develop a JSON database application that works as a key-value. In this way, we can store data with keys as if creating a table in a single database file.

## 🔗 Installation

```bash
yarn add @aytacmallkoc/jsondb
```
or

```bash
npm install @aytacmalkoc/jsondb
```

## 👉 Usage
Please refer to the [table](#-method-parameters) below for the parameters of the methods.

JsonDB uses root directory as default database path.
    
```js
const JsonDB = require('@aytacmalkoc/jsondb');
const db = new JsonDB('database/db.json');
```

### ➡️ Using with options
```js
const db = new JsonDB('database/db.json', {
    uuid: true,
    primaryKey: 'id',
    timestamp: true,
});
```
### ⚙️ Options
| **Option** | **Type** | **Default** | **Description**                          |
|------------|----------|-------------|------------------------------------------|
| uuid       | boolean  | true        | Generate unique id for each record.      |
| primaryKey | string   | 'id'        | Define identity key                      |
| timestamp  | boolean  | true        | Add created_at and updated_at fields. |

## Methods
Methods return different values depending on usage. The add and update, findById, findAll methods return the object or array it affects.
The delete, deleteAll, and clear methods return true or false.

### add
The add method adds the objects given as parameters.
```js
const user = db.add('users', {
    name: 'Aytac',
    surname: 'Malkoc',
    age: 22,
    email: 'aytacmalkoc@protonmail.com'
});

console.log(user); // Prints the user object
```

### update
The update method is used to update data by id. Only given keys are updated. For example, we can only update the age of the user created in the add method.
```js
const user = db.update('users', 1, {
    age: 23,
});
```
### where
The where method finds items based on their key-value using comparison operators.
```js
const users = db.where('users', 'age', '>', 18); // return array of users with age greater than 18
```

#### Operators
| **Operator** | **Description**                | **Accepted types**      |
|--------------|--------------------------------|-------------------------|
| =            | Equal                          | string, number, boolean |
| !=           | Not equal                      | string, number, boolean |
| >            | Greater than                   | string, number, boolean |
| <            | Less than                      | string, number, boolean |
| >=           | Greater than or equal          | string, number, boolean |
| <=           | Less than or equal             | string, number, boolean |
| like         | Like                           | string, number, boolean |
| not like     | Not like                       | string, number, boolean |
| between      | Between **(only numbers)**     | number[]                |
| not between  | Not between **(only numbers)** | number[]                |

### findById
    
```js
const user = db.findById('users', 1);
```

### findAll
```js
const users = db.findAll('users');
```

### delete
```js
const deleteUser = db.delete('users', 1);
```

### deleteAll
```js
const deleteAll = db.deleteAll('users');
```

### clear
Changes the database file to its default.
```js
const clear = db.clear();
```

### timeAgo
The timeAgo method can be used to convert the timestamp values of the data into readable format.
```js
const user = db.findById('users', 1);
const ago = db.timeAgo(user.created_at);

console.log(ago); // 30 minutes ago
```

### getDatabaseSize
The getDatabaseSize method returns an object containing the values of bytes, kilobytes, megabytes, and gigabytes.
```js
const size = db.getDatabaseSize(); // return size object

console.log(`${size.kb} KB`); // 1.5 KB
```

### ⚙️ Method Parameters

| Method          | Parameters                      |
|-----------------|---------------------------------|
| add             | key, value                      |
| where           | modelName, key, operator, value |
| findById        | key, id                         |
| findAll         | key                             |
| update          | key, id, value                  |
| delete          | key, id                         |
| deleteAll       | key                             |
| clear           | -                               |
| timeAgo         | date                            |
| getDatabaseSize | toFixed (default: 2)            |

## 🔗 Examples
You can check the [postman workspace collections](https://www.postman.com/aytacmalkoc/workspace/aytacmalkoc-jsondb) for detailed examples.

- [ ] NodeJS
- [x] Express
- [ ] React
- [ ] Vue

## ✏️ Formatting

### 📝 Lint

```bash
yarn lint
```

### 👀 Watch changes

```bash
yarn prettier-watch
```

### ✒️ Format Document

```bash
yarn prettier-format
```
---

## 🚀 Publish

```bash
yarn publish
```
or
```bash
npm run publish
```

## 💁 License
MIT license, Copyright (c) Aytac Malkoc. For more information see [LICENSE](https://github.com/aytacmalkoc/jsondb/blob/main/LICENSE).
