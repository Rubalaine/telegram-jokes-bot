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
        Markup.callbackButton("ver o tempo", "ver o tempo"),
        Markup.callbackButton("piada", "piada"),
      ])
    )
  );
});
bot.action("ver o tempo", (ctx) => {
  ctx.reply(
    "<b>Como deseja</b>",
    Extra.HTML().markup(
      Markup.inlineKeyboard([
        Markup.callbackButton("em celsius", "em celsius"),
        Markup.callbackButton("em Farenheit", "em Farenheit"),
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
// const stepHandler = new Composer();
// stepHandler.action("next", (ctx) => {
//   ctx.reply(
//     "Step 2. Via inline button",
//     Markup.inlineKeyboard([
//       Markup.urlButton("❤️", "http://telegraf.js.org"),
//       Markup.callbackButton("➡️ Next", "next"),
//     ]).extra()
//   );
//   return ctx.wizard.next();
// });
// stepHandler.command("next", (ctx) => {
//   ctx.reply("Step 2. Via command");
//   return ctx.wizard.next();
// });
// stepHandler.use((ctx) =>
//   ctx.replyWithMarkdown("Press `Next` button or type /next")
// );

// const superWizard = new WizardScene(
//   "super-wizard",
//   (ctx) => {
//     ctx.reply(
//       "Step 1",
//       Markup.inlineKeyboard([
//         Markup.urlButton("❤️", "http://telegraf.js.org"),
//         Markup.callbackButton("➡️ Next", "next"),
//       ]).extra()
//     );
//     return ctx.wizard.next();
//   },
//   stepHandler,
//   (ctx) => {
//     ctx.reply("Step 3");
//     return ctx.wizard.next();
//   },
//   (ctx) => {
//     ctx.reply("Step 4");
//     return ctx.wizard.next();
//   },
//   (ctx) => {
//     ctx.reply("Done");
//     return ctx.scene.leave();
//   }
// );

// const stage = new Stage([superWizard], { default: "super-wizard" });
// bot.use(session());
// bot.use(stage.middleware());
// bot.launch();
