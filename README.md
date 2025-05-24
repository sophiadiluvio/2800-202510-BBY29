## About Us
Team Name: BBY-29
Team Members: 
- Aarshdeep Vandal: avandal1@my.bcit.ca
- Russell Melchiorre: rmelchiorre@my.bcit.ca
- Sophia Diluvio: mdiluvio@my.bcit.ca
- Jack Huang: jhuang319@my.bcit.ca
- Regina Park: dpark88@my.bcit.ca

## More details to come

Project Title: ShelterLink

Project Description: This application aims to bridge the communication gap between organizers, volunteers, and homeless people. Many shelters lack an accessible and unified platform to update their resource availability, such as food,clothing, and medicine while displaying it to the public. This makes it hard for volunteers to know where help is needed and homeless people to find up-to-date shelter information.

Technologies:
    Frontend: NextJs, Tailwind CSS
    Backend: NextJs
    Database: MongoDB Hosted on MongoDB Atlas

Liscences:
    MapBox API: Usage should align with terms of services - https://www.mapbox.com/legal/tos
    Cohere AI: Usage should align with terms of services - https://cohere.com/terms-of-use

Getting Started:
 1. Use the command git clone https://github.com/sophiadiluvio/2800-202510-BBY29 in a directory of your choosing
 2. Go into that project directory in which you git cloned and do the following command to open a development server - npm run dev (For more information on Nextjs startup, read the section below)
 3. This project is a Nextjs project. Nextjs projects are initialized with the command npx create-next-app@latest
 4. The whole team coded on VSCode. We also used sourcetree for github GUI however its not required
 5. When the project is cloned, open into the dierctory and perform npm i. This will install all the nessary packages.
 6. Here is a link to the current testing log: https://docs.google.com/spreadsheets/d/1ynuWHS_jFvunLvziMP2i6Y6RC7YnsgYmSebV4qh__M0/edit?gid=394496370#gid=394496370

The application has three types of users. Users without a login can still use the application. They have access to the map which lets them see shelters in the mongoDB database. They can interact with these shelter pins in various pages.

Users can either register as a community member or an organization account.

Community members have the access to the same features as the unlogged in users. They also get additional features to favourite shelters and donation to shelter in need of suppiles.

Organization accounts can register a shelter and update the inv of those shelters. They also get access to the same featuers as unlogged in users.

We used Cohere AI and MapBox API in this project.

-------------------------------------------------------------------------------------------------------------------------------------------------------
Nextjs startup:

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
