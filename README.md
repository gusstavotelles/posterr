# Postrr (Backend) - Gustavo Luiz Campolina Telles

## Coding

- For the realization of the challenge, the stack chosen was NestJS, because it is a modern framework, easy to set up, easy to establish and execute, also because of the familiarity with TypeScript

- The structures were created using the automated command 'nest generate resource' (shown below), already creating each module separately with its Controller, Service and .spec files for executed unit tests. '.repository' files have been added
  for each module.

```
 $ nest generate resource account
```

- Each entity is a separate module, which in turn is composed of a controller, a service and a repository
- the database chosen is MySQL which is maintained through docker compose during project execution.

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

once Accessed Swagger, just test each method with the correct entries, following the respective formats in each swagger call

PS: methods that receive "posts_count" use this parameter to skip records already retrieved from the database, and retrieve new ones, making loading on demand work

## Planning

### Questions:

1. How do you want users to be able to see reply posts?
2. Do you want reply posts to be shown in the "Posts and Replies" feed on the user profile, or just the original posts?
3. Do you want reply posts to be shown on the homepage feed?
4. What is the expected behavior of the "reply-to-post" feature?
5. How should replies be displayed in the "Posts and Replies" feed?
6. Will replies be visible on the homepage feed?
7. Who will be able to see replies?
8. How will users be notified of replies to their posts?
9. What should happen if a user tries to reply to a post that has been deleted?
10. Will users be able to edit or delete their replies?
11. Are there any other features that need to be implemented in order for this feature to work correctly?
12. Do you have any additional information or examples that would be helpful?

### Solution

The first step would be to create a new database table for reply posts. This table would have a foreign key to the original post that it is replying to.

On the front-end, a new feed would need to be created called "Posts and Replies". This feed would be accessible from the user profile page. This feed would show both the original posts and the reply posts.

The reply posts would need to be formatted differently from the regular posts. They would need to include the "@username" of the user that they are replying to.

The reply posts would not be shown on the homepage feed.

The API will need to be updated to return the new field from the database when fetching posts. This will allow the front-end to properly display the "Posts and Replies" feed on the user profile.

### Self critique & Scaling

In this project I tried to prioritize the good structuring of the folders, separate the responsibilities between controllers, services and repositories and mainly type as much as possible.
With more time I would certainly implement more unit tests, both for services and for controllers. I would also add the constraints to the database, which is FUNDAMENTAL for its correct functioning. another interesting implementation would be to add migrations to the entities.
I would also like to have implemented better responses by creating models for them, following a standard structure.

## Research Sources

- https://docs.nestjs.com/openapi/introduction
- https://medium.com/the-crowdlinker-chronicle/using-docker-with-nestjs-or-any-nodejs-app-e905b83275e
- https://github.com/CrowdLinker/nestbox/blob/master/examples/custom-entrypoint/docker-compose.yml
- https://progressivecoder.com/how-to-configure-nestjs-typeorm-integration-mysql/
- https://stackoverflow.com/questions/49504765/debugging-nest-js-application-with-vscode
- https://docs.nestjs.com/fundamentals/testing#unit-testing
- https://docs.nestjs.com/techniques/database
- https://progressivecoder.com/how-to-configure-nestjs-typeorm-integration-mysql/
