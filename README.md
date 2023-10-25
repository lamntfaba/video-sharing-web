## Introduction
A small project, with the purpose of sharing videos you have watched on Youtube.

You need to log in to be able to share videos and express your love by voting

## Prerequisites
- React: 18
- NextJS: 13.5.6
- Firebase: ^10.5.0
- Formik: ^2.4.5
- react-youtube: ^10.1.0

## Installation
- Clone project: 
 + http: https://github.com/lamnt208/video-sharing-web.git
 + git@github.com:lamnt208/video-sharing-web.git

- npm install
- docker-compose up (if you want to setup and run docker for this)

## Getting Started
(No need if you built docker image and ran it.)
First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Usage
- Visit the URL https://video-sharing-34b84.web.app/ or start localhost if you want.
- You can only watch videos but cannot perform actions if you are not logged in.
- In the header, please enter your email and password. If you do not have an account, the system will create a new account for you.
- Please click on the share a movie button to share the video.
- Through the homepage, you can like or dislike the video.

## Troubleshooting
Cypress to write unit tests has not been completed yet because I am having problems during the installation process
