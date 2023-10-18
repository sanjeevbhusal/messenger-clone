const environmentVariables = {
  nodeEnvironment: process.env.NODE_ENV || "development",
  nextAuthSecretKey: process.env.NEXTAUTH_SECRET || "",
  githubClientId: process.env.GITHUB_CLIENT_ID || "",
  githubClientSecret: process.env.GITHUB_CLIENT_SECRET || "",
  googleClientId: process.env.GOOGLE_CLIENT_ID || "",
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
};

export { environmentVariables };
