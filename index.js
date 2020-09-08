const {
  Telegraf,
  Markup,
  Extra,
  session,
  Composer,
  Stage,
} = require("telegraf");
const WizardScene = require("telegraf/scenes/wizard");
const randomWord = require("./randomWord");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
console.log(process.env.TOKEN);
const bot = new Telegraf(process.env.TOKEN);
bot.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const tempoDeResposta = new Date() - start;
  console.log(`Tempo de resposta: ${tempoDeResposta}`);
});
bot.start((ctx) => {
  ctx.reply("Olá eu sou KBOT mande qualquer mensagem para ver as opcoes!");
});
bot.help((ctx) => {
  ctx.reply("estou aqui para te ajudar");
});
bot.hears("Ola", (ctx) => {
  ctx.reply(
    "<b>Olá Em que posso ajudar</b>",
    Extra.HTML().markup(
      Markup.inlineKeyboard([
        Markup.callbackButton("piada", "piada"),
      ])
    )
  );
});
bot.action("piada", async (ctx) => {
  console.log("piada");
  const piada = await randomWord();
  console.log(piada);
  ctx.reply(piada);
});
bot.launch();
