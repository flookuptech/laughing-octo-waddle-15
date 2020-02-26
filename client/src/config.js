const dev = {
  apiUrl: "http://localhost:4000",
  authApiUrl: "http://localhost:4001"
};

const prod = {
  apiUrl: "/api",
  authApiUrl: "/auth"
};

const config = process.env.NODE_ENV === "production" ? prod : dev;
// const config = prod;

export default {
  ...config
};
