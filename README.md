# jwt-auth-frontend

My first ReactJS project implementing Forms, Protected Routes, Redirection, and using Axios to communicate with an API.

This project's backend: https://github.com/om4rkh4lid/jwt-auth-backend

## Description

In this project I practiced working with ReactJS to create an frontend app that communicates with the aforementioned API and displays different content based on whether the user is authenticated or not.
The user also cannot access certain paths like '/login' or '/register' if he or she is authenticated.
I've also used Axios Interceptors to automatically refresh expired access tokens and attach authorization headers to requests.

## Getting Started

### Dependencies

* react
* react-dom
* react-router-dom
* axios

### Installing

* Download the project files or clone this repository

### Executing program

* Make sure you have nodejs installed
* run the following command in the project's root directory
```
npm start
```
