# 📖 jsondb

Easy, fast local database system with JSON.

[![npm downloads](https://img.shields.io/npm/dt/@aytacmalkoc/jsondb)](https://www.npmjs.com/package/@aytacmalkoc/jsondb)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/aytacmalkoc/jsondb/blob/main/LICENSE)

# 🧧 Table of contents

- [📖 jsondb](#-jsondb)
  - [🙇‍♂️ Motivation](#-motivation)
  - [🔗 Installation](#-installation)
  - [👉 Usage](#-usage)
  - [⚙️ Methods](#methods)
  - [✏️ Formatting](#formatting)
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
Please refer to the [table](#method-parameters) below for the parameters of the methods.
    
```js
const JsonDB = require('@aytacmalkoc/jsondb');
const db = new JsonDB('./database/db.json');
```

### ➡️ Using with options
```js
const db = new JsonDB('./database/db.json', {
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
| timestamp  | boolean  | true        | Create created_at and updated_at fields. |

## Methods
Methods return different values depending on usage. The add and update, findById, findAll methods return the object or array it affects.
The delete, deleteAll, and clear methods return true or false.

### add
    
```js
const user = db.add('users', {
    name: 'Aytac',
    surname: 'Malkoc',
    age: 22,
    email: 'aytacmalkoc@protonmail.com'
}); // return user object
```

### update
```js
const user = db.update('users', 1, {
    age: 23,
});
```

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
const delete = db.delete('users', 1);
```

### deleteAll
```js
const deleteAll = db.deleteAll('users');
```

### clear
```js
const clear = db.clear();
```

### ⚙️ Method Parameters

| Method    | Parameters     |
|-----------|----------------|
| add       | key, value     |
| findById  | key, id        |
| findAll   | key            |
| update    | key, id, value |
| delete    | key, id        |
| deleteAll | key            |
| clear     | -              |

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
