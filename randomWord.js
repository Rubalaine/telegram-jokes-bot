const axios = require("axios");

module.exports = async () => {
  try {
    const { data } = await axios({
      method: "GET",
      url: "https://us-central1-kivson.cloudfunctions.net/charada-aleatoria",
      headers: {
        Accept: "application/json",
      },
    });
    console.log("joke ", data);
    const joke = `${data.pergunta}\n\n${data.resposta}`;
    console.log(joke);

    return joke;
  } catch (error) {
    console.log(error);
    return "Ups, thats enough for today";
  }
};
