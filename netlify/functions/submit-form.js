const querystring = require("querystring");

exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const data = querystring.parse(event.body);

  // Basic bot check
  if (data["bot-field"] || data.website_url) {
    return { statusCode: 200, body: "Bot ignored" };
  }

  console.log("Form submission received:", data);

  return {
    statusCode: 302,
    headers: {
      Location: "/thank-you.html"
    },
    body: ""
  };
};
