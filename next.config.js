/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  env: {
    apiKey: `${process.env.apiKey}`,
    authDomain: `${process.env.authDomain}`,
    projectId: `${process.env.projectId}`,
    storageBucket: `${process.env.storageBucket}`,
    messagingSenderId: `${process.env.messagingSenderId}`,
    appId: `${process.env.appId}`,
    measurementId: `${process.env.measurementId}`,

    emailJsServiceId: `${process.env.emailJsServiceId}`,
    emailJsTemplateId: `${process.env.emailJsTemplateId}`,
    emailJsPublicKey: `${process.env.emailJsPublicKey}`,
  },
};
