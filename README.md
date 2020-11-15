# env-typed

This package is to help with parsing env variables with correct typing in node projects built with typescript.


## Installation 

```
npm i -s env-typed
```

## Usage

This package exports a single function named `parseEnvVariables` and an interface named `EnvVarsTemplate`. Using these you can pass a template for your env variables using the interface to the function and it will return an object with correct types for the env variables.

The following types are supported for parsing...

| type            | parsing        | notes                                         |
|-----------------|----------------|-----------------------------------------------|
| string          | none           | returned as is from process.env               |
| number          | Number(input)  | result of Number() checked with isNaN()       |
| boolean (true)  | 'true' or '1'  |                                               |
| boolean (false) | 'false' or '0' |                                               |
| json            | JSON.parse()   | if parsing fails, variable is returned as is  |

  
If an env variable provided in the template isn't present, it will be undefined in the return object.

If parsing fails for any env variable in the template, the env variable will be returned as is (usually a string).

### Example

```typescript
/**
* index.ts
* Typescript example
*/
import { parseEnvVariables, EnvVarsTemplate } from 'env-typed';

const myEnvVariables: EnvVarsTemplate = {
  NET_TIMEOUT: 'number',
  LOG_TYPE: 'string',
  ENABLE_LOGGING: 'boolean',
  ADAPTER_CONFIG: 'json',
}

const parsedEnvVariables = parseEnvVariables(myEnvVariables);

console.log('parsed environment variables');
console.log(parsedEnvVariables);

```

```javascript
/**
* index.js
* Javascript example
*/
const { parseEnvVariables } = require('env-typed');

const myEnvVariables = {
    NET_TIMEOUT: 'number',
    LOG_TYPE: 'string',
    ENABLE_LOGGING: 'boolean',
    ADAPTER_CONFIG: 'json',
  };  

const parsedEnvVariables = parseEnvVariables(myEnvVariables);

console.log('parsed environment variables');
console.log(parsedEnvVariables);
```

Example output running the above file with env variables.
```
export NET_TIMEOUT=5000
export LOG_TYPE=tiny
export ENABLE_LOGGING=true
export ADAPTER_CONFIG='{"url":"https://www.example.com","basePath":"/api/v1"}'
node .

parsed environment variables
{
  NET_TIMEOUT: 5000,
  LOG_TYPE: 'tiny',
  ENABLE_LOGGING: true,
  ADAPTER_CONFIG: { url: 'https://www.example.com', basePath: '/api/v1' }
}
```
