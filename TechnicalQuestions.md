# Technical Questions
## Did you have time to complete the coding test? What did you prioritise? If you didn't spend much time on the coding test then use this as an opportunity to explain what you would add.

Yes I had time to complete it. 
I prioritized to make sure that the Backend endpoints worked with Postman, then that the Frontend send the right data to the Backend and that the functionality matches with what was requested on the Task Requirements.

## What would you add to your solution if you had more time?
1. Add tests. I like to follow Test Driven Development, it saves a lot of headackes later.
2. Add validations on both applications.

## How would you optimise your solution?
1. Security on both applications: Securing the endpoints with JWTs or similar and adding a Login screen and maybe roles to the Frontend.
2. Add a relational database to the Backend to relate Accounts with Transfers and store the information securely.
3. Add a better design to the Front end.
4. Add configurations for multiple environments and create a .env file for local development.

## What are the security issues you can see in your solution?
1. The backend endpoints are not secured.
2. The frontend is open to all users.

## How does your solution handle concurrency in order to maintain correct ordering or transfers.
1. Using ayncronous functions and calls to the backend endpoints.

## List a few of your preferred JavaScript frameworks (also let us know in which situations you would choose to use/not use them).
1. NodeJs with Express for backend projects and APIs. I use it if I need to transfer data very fast, but without a lot of computation on it. If I need to do too many calculations then I would go with Java.
2. React for the frontend, even though it's a library rather than a framework. I like to use it if I'm building new web applications or if I were to work on a mobile app, then I'd use React Native because it's very powerful or if it's a simple mobile app, then Ionic React is another one that I would consider.
3. JQuery is still one of my favorites but only if I'm building a simple web page or website. It's easy to use although it's on its way out.