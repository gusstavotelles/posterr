# Postrr (Backend) - Gustavo Luiz Campolina Telles
## Coding

* For the realization of the challenge, the stack chosen was NestJS, because it is a modern framework, easy to set up, easy to establish and execute, also because of the familiarity with TypeScript

* The structures were created using the automated command 'nest generate resource' (shown below), already creating each module separately with its Controller, Service and .spec files for executed unit tests. '.repository' files have been added
  for each module.
``` 
 $ nest generate resource account
```
* Each entity is a separate module, which in turn is composed of a controller, a service and a repository
* the database chosen is MySQL which is maintained through docker compose during project execution.

## How to Run
After having the repository cloned or opened via .RAR file, being in the root directory of the project, run it in the terminal:
``` 
 $ npm i
```

``` 
 $ docker-compose down && docker-compose up --build
```
``` 
 $ npm run start:dev
```

after the build, access http://localhost:3001/api/#/ where you will have access to Swagger.

Tendo Acessado o Swagger, basta testar cada método com as entradas corretas, seguindo o formato do exemplo:
do exemplo
1) Account
``` 
{"name": "Gustavo Telles", "document": "111.222.333-44", "available_value": 10000}
{"name": "Alicia Ligeiro", "document": "999.999.999-99", "available_value": 2000}
```

2) Transaction
``` 
{"sender_document": "111.222.333-44", "receiver_document": "999.999.999-99", "value": 300}
```

## Fontes de pesquisa para desenvolvimento do projeto
* https://docs.nestjs.com/openapi/introduction
* https://medium.com/the-crowdlinker-chronicle/using-docker-with-nestjs-or-any-nodejs-app-e905b83275e
* https://github.com/CrowdLinker/nestbox/blob/master/examples/custom-entrypoint/docker-compose.yml
* https://progressivecoder.com/how-to-configure-nestjs-typeorm-integration-mysql/
* https://stackoverflow.com/questions/49504765/debugging-nest-js-application-with-vscode
* https://docs.nestjs.com/fundamentals/testing#unit-testing
* https://docs.nestjs.com/techniques/database
* https://progressivecoder.com/how-to-configure-nestjs-typeorm-integration-mysql/

