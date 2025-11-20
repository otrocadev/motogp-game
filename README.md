# OmdbFrontPage
## 🎯 Objectives

OMDB Front Page is an Angular web application that allows users to search and browse movie information using the [OMDB API](https://www.omdbapi.com/). Features include user authentication (sign up/login) powered by [Supabase](https://supabase.com/), movie search functionality, and detailed movie information display.

## Requeriments

### User management system
- [X] The user is able to sign in to the platform.
- [X] The user is able to log in to the platform.

### Film search
- [X] The user is able to search for movies once the session is active.
- [X] The user can see the details information of one film once fond it from the search.

## 🖥️ Preview of the project

https://github.com/user-attachments/assets/96dd1dca-8423-4454-92df-3e81d832dbeb

## 🛠️ Stack used
- 🚀 **Angular 19**
- 🎨 **Tailwind 4 with base components from [Flowbite](https://flowbite.com/)**

## Development server

To start a local development server, run:

```bash
ng serve
```
For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

## 🏗️ Things to improve

- [ ] Better session handling.
- [ ] Protected routes on searching films or dispñaying the info of a film.
- [ ] More compelling UI.
- [ ] More advanced search filters.
