# task-management-portal

Get-Set-Go is a sample web app where you can manage your day to day tasks which will help in increasing your productivity and focus and also keep record of your productive work.

## Learning

- Drag and Drop functionality
- Dynamic use of LocalStorage

## Tech Stack

### `npx create-react-app <app name>`

It's a package runner tool use for creating basic react front end app setup

### `react-uuid`

UUID(universally unique identifier) is a library used for creating unique id to identifying tasks

## Folder Structure

- Components
- - Navbar
- - Taskbar
- - Taskcard
- Pages
- - Homepage
- Assets
- - Logo

## Storage

## `Local Storage`

It is a property that allows JavaScript sites and apps to save key-value pairs in a web browser with no expiration date.
The purpose using localstorage is just learning, I am aware of mongoDB and can impliment other database.

## Deployment

### `_redirects`

It is a file that tells Netlify where it should redirect the clients based on the address or route that they are attempting to request.

### `npm run build`

npm run build creates a build directory with a production build of your app. When users visit your site, each of your files will require an additional HTTP request, making your site slower to load. To solve this we can create a “build” of our app, which merges all your CSS files into one file, and does the same with your JavaScript.
