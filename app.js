import TelegramBot from "node-telegram-bot-api";

const bot = new TelegramBot("5456382584:AAHjFL_HkWkVZVqWMdHPtlabuykURNFfr70", {
  polling: true,
});

let date = new Date();

bot.setMyCommands([
  {
    command: "/start",
    description: "Start bot",
  },
  {
    command: "/info",
    description: "Get information",
  },
]);

bot.onText(/\/start/, (msg) => {
  bot.sendSticker(
    msg.chat.id,
    "CAACAgQAAxkBAANWY2QEPlzq3vim0i9HELYo0hRrhwkAAhUDAAIv2CUOAnTLZ07ySQMqBA"
  );
  bot.sendMessage(msg.chat.id, `Hello ${msg.from.first_name}`, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Register📝",
            callback_data: "register",
          },
        ],
      ],

      resize_keyboard: true,
    },
  });
});

bot.onText(/\/info/, (msg) => {
  bot.sendMessage(msg.chat.id, "Choose one", {
    reply_markup: {
      keyboard: [["👨🏻‍💻About me", "💼GitHub"], ["🔙Back"]],
      resize_keyboard: true,
    },
  });
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;

  if (msg.text == "💼Some projects") {
    bot.sendPhoto(chatId, "./files/projects.webp", {
      caption: "Choose",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Writers📚 , mobile ❎",
              url: "https://magenta-chaja-d63d47.netlify.app/",
            },
          ],
          [
            {
              text: "Movies🎬 , mobile ❎",
              url: "https://incomparable-seahorse-0dc233.netlify.app/",
            },
          ],
          [
            {
              text: "Countries🏳️ , mobile ✅",
              url: "https://sparkly-dusk-92c55f.netlify.app",
            },
          ],
          [
            {
              text: "Weather☁️ , mobile ✅",
              url: "https://capable-rabanadas-26fa38.netlify.app/",
            },
          ],
        ],
      },
    });
  } else if (msg.text == "👨🏻‍💻About me") {
    bot.sendPhoto(chatId, "./files/myphoto.jpg", {
      caption:
        "Hi I'm Mohir\nWelcome to my bot \nI'm Front-end Back-end developer",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Profile",
              url: "https://t.me/Moxirjon_Alimov",
            },
          ],
        ],
      },
    });
  } else if (msg.text == "💼GitHub") {
    bot.sendPhoto(chatId, "./files/github.webp", {
      caption:
        'GitHub page: <span class="tg-spoiler">https://github.com/Mohirjon-Alimov</span>',
      parse_mode: "HTML",
    });
  } else if (msg.text == "🔙Back") {
    bot.sendMessage(msg.chat.id, "Ok", {
      reply_markup: {
        keyboard: [["👨🏻‍💻About me", "💼Some projects"]],
        resize_keyboard: true,
      },
    });
  } else if (msg.text) {
    bot.sendMessage(
      "-1001859543798",
      `${msg.text},\n${msg.from.first_name}\n@${
        msg.from.username
      }\n${date.getDate()}.${
        date.getMonth() + 1
      }.${date.getFullYear()}   ${date.getHours()}:${date.getMinutes()}`
    );
    // console.log(msg);
  }
});
bot.on("callback_query", (msg) => {
  const chatId = msg.message.chat.id;
  if (msg.data == "register") {
    bot.sendMessage(chatId, "Pleace send phone number📲", {
      reply_markup: JSON.stringify({
        keyboard: [
          [
            {
              text: "Send phone number📲",
              request_contact: true,
            },
          ],
        ],
        resize_keyboard: true,
      }),
    });
  }
});
bot.on("contact", (msg) => {
  // console.log(msg);
  bot.sendMessage(
    "-1001859543798",
    `${msg.contact.phone_number}\n${msg.from.first_name}\n@${
      msg.from.username
    }\n${date.getDate()}.${
      date.getMonth() + 1
    }.${date.getFullYear()}   ${date.getHours()}:${date.getMinutes()}`
  );
  bot.sendMessage(msg.chat.id, "You are registred", {
    reply_markup: {
      keyboard: [["👨🏻‍💻About me", "💼Some projects"]],
      resize_keyboard: true,
    },
  });
  return;
});
