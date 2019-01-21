# Technigo Eslint Config

This eslint config builds upon the standard airbnb config, with a few changes, including decorator support.

## Installation

Install dependencies in your project:

    npm install --save eslint eslint-config-technigo

Create a .eslintrc.json file in the root of your project with the following:

```
{
  "extends": [
    "technigo"
  ]
}
```

## Usage

To make life easier, add a new "lint" script to your scripts in package.json:

```
{
  "scripts": {
    "lint": "eslint ."
  }
}
```

Then run in your project with `npm run lint`
