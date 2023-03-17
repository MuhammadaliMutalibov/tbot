const { Telegraf, Markup, Extra, session } = require("telegraf");

const token = "5615579867:AAHujvWOINrXrUGFRBwkytzTCYQX3hroyVE";
const KANAL_ID = "-1001599836151";
// const KANAL_ID1 = "-1001615422379";

const bot = new Telegraf(token);
bot.use(session());

// start

bot.start((ctx) => {
  ctx.replyWithHTML(
    `<b>👋 Assalomu alaykum <a href="tg://user?id=${ctx.from.id}">${ctx.from.first_name}</a>.\n\n Diplomat University Botimizga Xush kelibsiz !!\nBotni ishga tushurish uchun\n"Ro'yxatdan o'tish" tugmasini bosing.
Bu botdan foydalanayotganingiz uchun raxmat!!
👇👇👇
 </b>`, 
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(`➕ Ro'yhatdan o'tish`, "royhat")],
      ]),
    }
  );
});

bot.action("royhat", async (ctx) => {
  ctx.session.flag = "fio";
  ctx.editMessageText("To'liq Ismingizni kiriting");
});

bot.on("message", async (ctx) => {
  text = ctx.message.text;
  switch (ctx.session.flag) {
    case "fio":
      console.log(text);
      ctx.session.name = text;
      ctx.session.flag = "tuman";
      ctx.replyWithHTML("To'liq manzilingiz");

      break;
    // case "viloyat":
    //   console.log(text);
    //   ctx.session.viloyat = text;
    //   ctx.session.flag = "tuman";
    //   ctx.replyWithHTML("Qaysi tumanda yashaysiz");
    //   break;
    case "tuman":
      ctx.session.tuman = Number;
      console.log(text);
      ctx.session.flag = "tel";
      ctx.replyWithHTML(`Yoshingiz nechchida`);
      break;
    case "tel":
      ctx.session.tel = text;
      console.log(text);
      ctx.session.flag = "yosh";
      ctx.replyWithHTML("Telefon raqamingizni kiriting", {
        reply_markup: Markup.keyboard([
          [Markup.contactRequestButton("Telefon raqamini yuborish")],
        ])
          .oneTime()
          .resize(),
      });
      break;
    case "yosh":
      tel = ctx.message.contact.phone_number;
      ctx.session.yosh = tel;
      console.log(text);
      ctx.session.flag = "";
      ctx.replyWithHTML(
        `<b>Sizning ma'lumotlaringiz:</b>\n\nIsmingiz:   <b>${ctx.session.name}</b>\n\nManzilingiz:   <b>${ctx.session.viloyat}</b>\n\nYoshingiz:   <b>${ctx.session.tel}</b>\n\nTelefon Raqamingiz:   <b>${ctx.session.yosh}</b>`,
        {
          reply_markup: Markup.inlineKeyboard([
            [Markup.callbackButton(`✍️Ro'yhatni Tahrirlash`, "royhat")],
            [Markup.callbackButton(`Boshlash`, "menu")],
          ]),
        }
      );
      ctx.telegram.sendMessage(
        KANAL_ID,
        `<b>Foydalanuvching malumoti:</b>\n\nFIO:   <b>${ctx.session.name}</b>\n\nManzil:   <b>${ctx.session.viloyat}</b>\n\nYosh:   <b>${ctx.session.tel}</b>\n\nTelefon Raqami:   <b>${ctx.session.yosh}</b>`,
        { parse_mode: "HTML" }
      );
      break;
    default:
      break;
  }
});

// rasm

// bot.action("rasm", async (ctx) => {
//   bot.telegram.sendPhoto(
//     ctx.chat.id,
//     {
//       source: "./media/aliyyy.jpg",
//     },
//     {
//       reply_markup: Markup.inlineKeyboard([
//         [Markup.callbackButton("Alicha", "alicha")],
//       ]),
//       caption: "Salom",
//     }
//   );
// });

//  menu

bot.action("menu", (ctx) => {
  ctx.deleteMessage();
  ctx.replyWithHTML(
    `Assalomu Alaykum
Tanlovingizni tanlang:!!👇👇`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("Uzbekiston Vikipediya", "uzbekiston")],
        [Markup.callbackButton("Savollar", "savollar")],
        [Markup.callbackButton("Qiziqarli malumotlar", "qiziqarli")],
        [Markup.callbackButton("Unversitet Haqida", "haqida")],
        [Markup.callbackButton("Tez-Tez beriladigan savollar", "unversavol")],
        [Markup.callbackButton("Hamkorlar", "hamkorlar")],
        // [Markup.callbackButton("Kurslarga qo'shilish", "lider")],
        // [Markup.callbackButton("Rektorga Murojat", "rektor")],
      ]),
    }
  );
});

// menu uzbekistan

bot.action("uzbekiston", (ctx) => {
  ctx.deleteMessage();
  ctx.replyWithHTML(`O’zbekiston Respublikasi Vikipediyasi `, {
    reply_markup: Markup.inlineKeyboard([
      [Markup.callbackButton("Uzbekiston", "Uzbekistonn")],
      [Markup.callbackButton("Toshkent viloyati", "Toshkent")],
      [Markup.callbackButton("Namangan Viloyati", "Namangan")],
      [Markup.callbackButton("Andijon Viloyati", "Andijon")],
      [Markup.callbackButton("Farg’ona Viloyati", "Farg’ona")],
      [Markup.callbackButton("Sirdaryo Viloyati", "Sirdaryo")],
      [Markup.callbackButton("Jizzah Viloyati", "Jizzah")],
      [Markup.callbackButton("Samarqand viloyati", "Samarqand")],
      [Markup.callbackButton("Buxoro Viloyati", "Buxoro")],
      [Markup.callbackButton("Navoiy Viloyati", "Navoiy")],
      [Markup.callbackButton("Qashqadaryo Viloyati", "Qashqadaryo")],
      [Markup.callbackButton("Surxandaryo Viloyati", "Surxandaryo")],
      [Markup.callbackButton("Xorazm Viloyati", "Xorazm")],
      [Markup.callbackButton("◀️ Ortga ", "chiqish")],
    ]),
  });
});

bot.action("chiqish", (ctx) => {
  ctx.deleteMessage();
  ctx.replyWithHTML(
    `Assalomu Alaykum
Tanlovingizni tanlang:!!👇👇`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("Uzbekiston Vikipediya", "uzbekiston")],
        [Markup.callbackButton("Savollar", "savollar")],
        [Markup.callbackButton("Qiziqarli malumotlar", "qiziqarli")],
        [Markup.callbackButton("Unversitet Haqida", "haqida")],
        [Markup.callbackButton("Tez-Tez beriladigan savollar", "unversavol")],
        [Markup.callbackButton("Hamkorlar", "hamkorlar")],
        // [Markup.callbackButton("Kurslarga qo'shilish", "lider")],
        // [Markup.callbackButton("Rektorga Murojat", "rektor")],
      ]),
    }
  );
});

// Uzbekiston

bot.action("uzbekistonn", (ctx) => {
  ctx.editMessageText(
    `Oʻzbekiston (rasman: Oʻzbekiston Respublikasi) — Markaziy Osiyoning markaziy qismida joylashgan mamlakat. Oʻzbekistonning poytaxti — Toshkent shahri boʻlib, davlat tili — oʻzbek tili hisoblanadi. Maydoni — 448,978[4] km2. Aholi soni (2020) — 34,011,621[5]. Pul birligi — soʻm. Oʻzbekiston Respublikasi 12 ta viloyat, Toshkent shahri va Qoraqalpogʻiston Respublikasidan iboratdir, shuningdek, davlat mustaqil, demokratik, dunyoviy va konstitutsiyaviy davlat ham hisoblanadi. Oʻzbekiston MDH, BMT, YXHT, va SHHT aʼzosidir. Oʻzbekiston qirgʻoqqa ega boʻlmagan besh mamlakat bilan, yaʼni: shimoldan Qozogʻiston; shimoli-sharqdan Qirgʻiziston; janubi-sharqdan Tojikiston; janubdan Afgʻoniston; va janubi-gʻarbiy qismida Turkmaniston bilan chegaradosh. r.`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(`◀️ Ortga`, "uzbekiston")],
      ]),
    }
  );
});

// Toshkent

bot.action("Toshkent", (ctx) => {
  ctx.editMessageText(
    `Toshkent viloyati — Oʻzbekiston Respublikasi tarkibidagi viloyat. Respublikaning shimoli-sharqida. 1938 yil 15 yanvda tashkil kilingan. Shimoliy va shimoli-gʻarbdan Qozogʻiston Respublikasi, shimoli-sharqdan Qirgʻiziston Respublikasi, sharqdan Namangan viloyati, janubidan Tojikiston Respublikasi, janubi-gʻarbdan Sirdaryo viloyati bilan chegaradosh. Maydoni (Toshkent shahri maydonisiz) 15,3 ming km². Aholisi (Toshkent shahri aholisisiz) 2,4 mln. kishidan ziyod (2004). Viloyat tarkibida 15 ta tuman (Bekobod, Boʻka, Boʻstonliq, Zangiota, Oqqoʻrgʻon, Ohangaron, Parkent, Piskent, Chinoz, Yuqori Chirchiq, Yangiyoʻl, Oʻrta Chirchiq, Qibray, Quyi Chirchiq), 17 shahar (Angren, Bekobod, Boʻka, Doʻstobod, Keles, Olmaliq, Oqqoʻrgʻon, Ohangaron, Parkent, Piskent, Toshkent, Toʻytepa, Chinoz, Chirchiq, Yangiyoʻl, Yangiobod, Gʻazalkent), 18 shaharcha (Alimkent, Boʻzsuv, Gulbahor, Zafar, Iskandar, Krasnogorsk, Nurobod, Olmazor, Salor, Tuyaboʻgʻiz, Chigʻiriq, Chorvoq, Eshonguzar, Yangibozor, Yangi chinoz, Yangihayot, Oʻrtaovul, Qibray), 146 qishloq fuqarolari yigʻini bor. Markazi – Toshkent shahri.`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(`◀️ Ortga`, "uzbekiston")],
      ]),
    }
  );
});

// Namangan

bot.action("Namangan", (ctx) => {
  ctx.editMessageText(
    `Namangan viloyati — Oʻzbekiston Respublikasi tarkibidagi viloyat. 1941 yil 11 martda tashkil etilgan (1960 yil 25 yanvarda Andijon va Fargʻona viloyatlari tarkibiga qoʻshib yuborilgan. 1967 yil 18 dekabrda kayta tashkil etildi). Namangan viloyati respublikaning sharqida, Fargʻona vodiysining shimoli-gʻarbiy qismida, Tyanshan togʻ tizmasi tarmoklari – Qurama va Chatqol togʻlarining yon bagʻrida joylashgan. Shimoliy va shimoli-sharkdan Qirgʻiziston Respublikasining Jalolobod viloyati, jan.-sharqsan Andijon, janubidan Fargʻona, shimoliy va shimoli-gʻarbdan Toshkent viloyati va Tojikistonning Sugʻd viloyati bilan chegaradosh. Maydoni 7,44 ming km². Aholisi 1982,7 ming kishi (2002). Namangan viloyatida 11 qishloq tumani (Kosonsoy, Mingbuloq, Namangan, Norin, Pop, Toʻraqoʻrgʻon, Uychi, Uchqoʻrgʻon, Chortoq, Chust, Yangiqoʻrgʻon), 8 shahar (Namangan, Kosonsoy, Pop, Toʻraqoʻrgʻon, Uchqoʻrgʻon, Chortoq, Chust, Haqqulobod), 11 shaharcha (Jomashoʻy, Toshbuloq, Navbahor, Oltinkon, Uygʻursoy, Chorkesar, Xalqobod, Uychi, Oʻnhayat, Yangiqoʻrgʻon, Oqtosh), 99 qishloq fuqarolari yigʻini bor. Markazi – Namangan shahri.`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(`◀️ Ortga`, "uzbekiston")],
      ]),
    }
  );
});

// Andijon

bot.action("Andijon", (ctx) => {
  ctx.editMessageText(
    `Andijon viloyati – Oʻzbekiston Respublikasi tarkibidagi viloyat. Fargʻona vodiysining sharqiy qismida. 1941-yil 6-martda tashkil etilgan. Maydoni 4,2 ming km². Aholisi 2196,0 ming kishi (2000). Andijon viloyatida 14 qishloq tuman, 11 shahar va 95 qishloq fuqarolari yigʻini bor (2000). Markazi – Andijon shahri.`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(`◀️ Ortga`, "uzbekiston")],
      ]),
    }
  );
});

// Fargona

bot.action("Farg’ona", (ctx) => {
  ctx.editMessageText(
    `Fargʻona viloyati — Oʻzbekiston Respublikasi tarkibidagi viloyat. 1938-yil 15-yanvarda tashkil etilgan. Respublikaning sharqida, Fargʻona vodiysining janubida joylashgan. Shimoldan Namangan, Andijon viloyatlari, janub va sharqdan Qirgʻiziston, gʻarbdan Tojikiston Respublikalari bilan chegaradosh. Maydoni 6,8 ming km2. Aholisi 3,317 ming kishi 2012. Tarkibida 15 tuman, 9 shahar (Beshariq, Margʻilon, Rishton, Fargʻona, Yaypan, Quva, Quvasoy, Qoʻqon, Hamza), 10 shaharcha, 164 qishloq fuqarolari yigʻini bor (2004). Markazi — Fargʻona shahri..`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(`◀️ Ortga`, "uzbekiston")],
      ]),
    }
  );
});

// Sirdaryo

bot.action("Sirdaryo", (ctx) => {
  ctx.editMessageText(
    `Sirdaryo viloyati - Oʻzbekiston Respublikasi tarkibidagi viloyat. 1963 yil 16 fevralda tashkil etilgan. Shimolidan Qozogʻiston Respublikasi, sharqdan Toshkent viloyati, janubidan Tojikiston Respublikasi va gʻarbdan Jizzax viloyati bilan chegaradosh. Maydoni 5,3 ming km. Aholisi 667.748 kishi (2003). Tarkibida 9 tuman (Boyovut, Guliston, Mehnatobod, Mirzaobod, Oqoltin, Sayxunobod, Sirdaryo, Xovos, Sardoba) (tumanlar haqida alohida maqolalarga qarang, maye. Boyovut tumani), 5 shahar (Guliston, Baxt, Sirdaryo, Shirin, Yangiyer), 6 shaharcha (Boyovut, Dehqonobod, Doʻstlik, Paxtaobod, Sayxun, Xovos) va 75 qishloq fuqarolari yigʻini bor (2004). Markazi — Guliston shahri`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(`◀️ Ortga`, "uzbekiston")],
      ]),
    }
  );
});

// Jizzah

bot.action("Jizzah", (ctx) => {
  ctx.editMessageText(
    `Jizzax viloyati — Oʻzbekiston Respublikasi tarkibidagi viloyat. Respublikaning markaziy qismida. 1973-yil 28-dekabrda tashkil etilgan. Shim.-sharqda Qozogʻiston Respublikasi va Sirdaryo viloyati, janubi-gʻarbda Samarqand, Navoiy viloyatlari, janubisharqda Tojikiston Respublikasi bilan chegaradosh. Maydon 21,2 ming km2. Aholisi 1 382,10 ming kishi (2020). Jizzax viloyatida 12 qishloq tumani (Arnasoy, Baxmal, Doʻstlik, Sharof Rashidov, Zarbdor, Zafarobod, Zomin, Mirzachoʻl, Paxtakor, Yangiobod, Forish, Gʻallaorol), 8 shahar (Gagarin, Dashtobod, Doʻstlik, Jizzax, Marjonbuloq, Paxtakor, Gʻallaorol,Zarbdor), 8 shaharcha (Boʻston, Zafarobod, Zomin, Oʻsmat, Uchquloch, Yangiqishloq, Qoʻytosh,Sharq yulduzi), 95 qishloq fuqarolari yigʻini bor (2001). Markazi — Jizzax shahri (Jizzax viloyati tumanlari haqida tegishli maqolalarga q.)`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(`◀️ Ortga`, "uzbekiston")],
      ]),
    }
  );
});

// Samarqand

bot.action("Samarqand", (ctx) => {
  ctx.editMessageText(
    `Samarqand viloyati — Oʻzbekiston Respublikasida birinchi tashkil boʻlgan viloyatlardan hisoblanadi. U 1938 yil 15 yanvarda tashkil topgan. Ushbu viloyat respublika hududining markaziy qismida, Zarafshon daryosining oʻrta oqimi havzasida joylashgan. Uning chegaralari gʻarb va shimoli-gʻarbda Navoiy viloyati, shimol va shimoli- sharqda Jizzax va janubda Qashqadaryo viloyatlari, janubi-sharqda Tojikiston bilan tutash. Viloyatning markaziy qismi goʻzal vohadan iborat boʻlib, bu voha uncha keng boʻlmay sharqdan-gʻarbga tomon Zarafshon va Turkiston togʻ tizmalari orasini egallagan. Viloyatning asosiy sugʻoriladigan yerlari xuddi ana shu maydonlarni egallagan. Aholi soni—2016 yil 1 yanvar holatidagi doimiy aholi soni 3 million 590 ming kishi (o‘rtacha aholi 3mln 596,6 kishi).Bu jihatidan Samarqand viloyati respublikada birinchi oʻrinda va respublika aholisining 11.4 foizini tashkil etadi. Viloyat hududi 16,8 ming km² Samarqand viloyati qishloq tumanlari soni boʻyicha Qoraqolpogʻiston Respublikasi va viloyatlar orasida birinchi oʻrinni egalaydi. Bu viloyatda bunday tumanlar soni 16 ta. Ular quyidagilar: Bulungʻur, Jomboy, Ishtixon, Kattaqoʻrgʻon, Narpay, Nurobod, Oqdaryo, Payariq, Pastdargʻom, Paxtachi, Samarqand, Toyloq, Urgut, va Qoʻshrabot tumanlari. Shaharlar soni 2 ta, bular (Samarqand va Kattaqoʻrgʻon. Koʻhna, noyob tarixiy obidalarga boy boʻlgan Samarqand shahri viloyatning markaziy shahri boʻlib, u 1924–1930-yillarda Oʻzbekiston poytaxti vazifasini bajargan`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(`◀️ Ortga`, "uzbekiston")],
      ]),
    }
  );
});

// Buxoro

bot.action("Buxoro", (ctx) => {
  ctx.editMessageText(
    `Buxoro viloyati — O‘zbekiston Respublikasining 12 viloyatlaridan biri. Oʻzbekiston viloyatlari ichida, chegasining kattaligi boʻyicha Navoiydan keyin ikkinchi oʻrinda turadi. 1938-yil 15-yanvarda tashkil etilgan. Buxoro viloyati hududi asosan Qizilqum cho‘lida joylashgan. Janubi-sharqini Zarafshon vodiysi egallagan. Shimoli-gʻarbda Xorazm viloyati va Qoraqalpog‘iston Respublikasi, shimol va sharqdan Navoiy viloyati, janubi-sharqda Qashqadaryo viloyati, janubi-gʻarbda Turkmaniston bilan chegaradosh. Maydoni 39,4 ming km2. Aholisi 1443 mingdan ziyod kishi (2001). Buxoro viloyati tarkibida 11 qishloq tumani: Buxoro, Vobkent, Jondor, Kogon, Olot, Peshku, Romitan, Shofirkon, Qorovulbozor, Qorako‘l, G‘ijduvon, 11 shahar (Buxoro, Galaosiyo, Vobkent, Gazli, Kogon, Olot, Romitan, Shofirkon, Qorako‘l, Qorovulbozor, G‘ijduvon), 3 shaharcha (Jondor, Zafarobod, Yangibozor), 121 qishloq fuqarolari yig‘ini bor. Buxoro shahar aholisining etnik tarkibi asosan Uzbek, Rus, Fors (Eroniylar), Turkman, tojik, Ukrain, koreys, tatar va boshqalar tashkil etadi.Markazi-Buxoro`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(`◀️ Ortga`, "uzbekiston")],
      ]),
    }
  );
});

// Navoiy

bot.action("Navoiy", (ctx) => {
  ctx.editMessageText(
    `Navoiy viloyati - Oʻzbekiston Respublikasi tarkibidagi viloyat. 1982 yil 20 aprelda Buxoro va qisman Samarqand viloyatlari hududlaridan tashkil etilgan. 1988 yilda maʼmuriy birlik sifatida tugatilib, 1992 yil boshida qayta tiklandi. Shimoliy va shimoli-sharqdan Qozogʻiston, janubi-sharqdan Jizzax, Samarqand, jan.dan Qashqadaryo, janubi-gʻarbdan Buxoro viloyatlari bilan chegaradosh. Maydoni 111,0 ming km². Aholisi 802,3 ming kishiga yaqin (2003).`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(`◀️ Ortga`, "uzbekiston")],
      ]),
    }
  );
});

// Qashqadaryo

bot.action("Qashqadaryo", (ctx) => {
  ctx.editMessageText(
    `Qashqadaryo viloyati — Oʻzbekiston Respublikasi tarkibidagi viloyat. 1924-yil 1-noyabrda tashkil etilgan. Respublikaning janubi-gʻarbida, Qashqadaryo havzasida, Pomir-Olay togʻ sistemasining gʻarbiy chekkasida, Amudaryo va Zarafshon daryolari, Hisor va Zarafshon tizma togʻlari orasida. Shimoli-gʻarbdan Buxoro, janubi-sharqdan Surxondaryo, janubi-gʻarb va gʻarbdan Turkmaniston, sharqdan Tojikiston va Samarqand viloyatlari bilan chegaradosh. Maydoni 28,6 ming km². Aholisi 3225, 8 ming kishi (3-oʻrin) (2020). Tarkibida 13 tumani (Dehqonobod, Kasbi, Kitob, Koson, Mirishkor, Muborak, Nishon, Chiroqchi, Shahrisabz, Yakkabogʻ, Qamashi, Qarshi, Gʻuzor), 12 shahar (Beshkent, Kitob, Koson, Muborak, Tallimarjon, Chiroqchi, Shahrisabz, Yakkabogʻ, Yangi Nishon, Qamashi, Qarshi, Gʻuzor), 4 shaharcha (Yangi Mirishkor,Dehqonobod, Miroqi, Eski Yakkabogʻ, Pomuq), 147 qishloq fuqarolari yigʻini, 1064 qishloq bor (2005)`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(`◀️ Ortga`, "uzbekiston")],
      ]),
    }
  );
});

// Surxandaryo

bot.action("Surxandaryo", (ctx) => {
  ctx.editMessageText(
    `Surxondaryo viloyati - Oʻzbekiston Respublikasi tarkibidagi viloyat. 1941 yil 6 martda tashkil etilgan (1925 yil 29 iyundan Surxondaryo okrugi boʻlgan). 1960 yil 25 yanvarda Qashqadaryo viloyati bilan qoʻshilgan. 1964 yil fevralda qaytadan tashkil qilindi. Respublikaning janubisharqida, Surxon-Sherobod vodiysida joylashgan. Viloyat nomi vohadan oqib o'tuvchi "Surxon" (fors-tojik: "qizil" ) daryosi nomidan kelib chiqqan. Janubidan Amudaryo boʻylab Afgʻoniston, shimoliy, shimoli-sharq va sharqdan Tojikiston, janubi-gʻarbdan Turkmaniston, shim.gʻarbdan Qashqadaryo viloyati bilan chegaradosh. Maydoni 20,1 ming km². Aholisi 2612,4 ming kishi (2019-yil, 1-oktyabr holatiga ko‘ra). Tarkibida 13 tuman (Angor, Bandixon, Boysun, Denov, Jarqoʻrgʻon, Muzrabot, Oltinsoy, Sariosiyo, Termiz, Uzun, Sherobod, Shoʻrchi, Qiziriq, Qumqoʻrgʻon), 8 shahar (Boysun, Denov, Jarqoʻrgʻon, Termiz, Shargʻun, Sherobod, Shoʻrchi, Qumqoʻrgʻon), 114 ta shaharcha, 865 ta qishloq aholi punktlari mavjud (2019). Markazi — Termiz shahri.`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(`◀️ Ortga`, "uzbekiston")],
      ]),
    }
  );
});

// Xorazm

bot.action("Xorazm", (ctx) => {
  ctx.editMessageText(
    `Xorazm viloyati — Oʻzbekiston Respublikasi tarkibidagi viloyat. 1925-yil fevraldan 1938-yil yanvargacha Xorazm okrugi, 1938-yil 15-yanvarda viloyat maqomiga o'tkazilgan. Umumiy maydoni — 6 300 kvadrat kilometr. Iqlimi kontinental, oʻrtamiyona sovuq qish va quruq issiq yoz boʻladi. Viloyat aholisi 1 930 747 kishi, zero, taxminan 60 foizi chet (qishloq) joylarda yashaydi. Viloyat 12 ta maʼmuriy tumanga ajratilgan, maʼmuriy markazi Urganch. Urganch aholisi 200 000 kishi. Viloyatning boshqa katta shaharlari — Xiva va Pitnak`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton(`◀️ Ortga`, "uzbekiston")],
      ]),
    }
  );
});

// menu savollar

bot.action("savollar", (ctx) => {
  ctx.session.text = 0;
  ctx.editMessageText(`Ozingiz hohlagan savol toplamiga kiring`, {
    reply_markup: Markup.inlineKeyboard([
      [Markup.callbackButton("Uzbekiston boyicha", "savollarr")],
      // [Markup.callbackButton('Anonim','anonim')],
      [Markup.callbackButton("◀️ Ortga ", "chiqish")],
    ]),
  });
});

// Savollar

bot.action("savollarr", (ctx) => {
  ctx.editMessageText(
    `1-Savol:\n1934-yili O’zbekiston SSR Fanlar komitetiga kim rais etib saylandi?`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("M.Cho’qayev", "M.Cho’qayev")],
        [Markup.callbackButton("F.Xo’jayev", "F.Xo’jayev")],
        [Markup.callbackButton("O.Hoshimov", "O.Hoshimov")],
        [Markup.callbackButton("A.Ikromov", "A.Ikromov")],
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
});

bot.action("O.Hoshimov", (ctx) => {
  ctx.editMessageText(
    `2-Savol:\n1929-yildan 1940-yilgacha O’zbekistonda qaysi yozuvdan foydalanilgan?`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("Arab", "Arab")],
        [Markup.callbackButton("Lotin", "Lotin")],
        [Markup.callbackButton("Krill", "Krill")],
        [Markup.callbackButton("O’zbek", "O’zbek")],
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
  ctx.session.text += 1;
  ctx.answerCbQuery(`To'g'ri`);
});

bot.action("M.Cho’qayev", (ctx) => {
  ctx.editMessageText(
    `2-Savol:\n1929-yildan 1940-yilgacha O’zbekistonda qaysi yozuvdan foydalanilgan?`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("Arab", "Arab")],
        [Markup.callbackButton("Lotin", "Lotin")],
        [Markup.callbackButton("Krill", "Krill")],
        [Markup.callbackButton("O’zbek", "O’zbek")],
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
  ctx.answerCbQuery(`Javobingiz Noto'g'ri`);
});

bot.action("F.Xo’jayev", (ctx) => {
  ctx.editMessageText(
    `2-Savol:\n1929-yildan 1940-yilgacha O’zbekistonda qaysi yozuvdan foydalanilgan?`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("Arab", "Arab")],
        [Markup.callbackButton("Lotin", "Lotin")],
        [Markup.callbackButton("Krill", "Krill")],
        [Markup.callbackButton("O’zbek", "O’zbek")],
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
  ctx.answerCbQuery(`Javobingiz Noto'g'ri`);
});

bot.action("A.Ikromov", (ctx) => {
  ctx.editMessageText(
    `2-Savol:\n1929-yildan 1940-yilgacha O’zbekistonda qaysi yozuvdan foydalanilgan?`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("Arab", "Arab")],
        [Markup.callbackButton("Lotin", "Lotin")],
        [Markup.callbackButton("Krill", "Krill")],
        [Markup.callbackButton("O’zbek", "O’zbek")],
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
  ctx.answerCbQuery(`Javobingiz Noto'g'ri`);
});

//----------------------------------\\

//-----------------------------------------\\

bot.action("Lotin", (ctx) => {
  ctx.editMessageText(
    `3-Savol:\n Respublika maktablarida o’qish qancha tilda olib borilgan?`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("12 ta", "12")],
        [Markup.callbackButton("17 ta", "17")],
        [Markup.callbackButton("18 ta", "18")],
        [Markup.callbackButton("15 ta", "15")],
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
  ctx.session.text += 1;
  ctx.answerCbQuery(`To'g'ri`);
});

bot.action("Arab", (ctx) => {
  ctx.editMessageText(
    `3-Savol:\n Respublika maktablarida o’qish qancha tilda olib borilgan?`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("12 ta", "12")],
        [Markup.callbackButton("17 ta", "17")],
        [Markup.callbackButton("18 ta", "18")],
        [Markup.callbackButton("15 ta", "15")],
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
  ctx.answerCbQuery(`Javobingiz Noto'g'ri`);
});

bot.action("Krill", (ctx) => {
  ctx.editMessageText(
    `3-Savol:\n Respublika maktablarida o’qish qancha tilda olib borilgan?`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("12 ta", "12")],
        [Markup.callbackButton("17 ta", "17")],
        [Markup.callbackButton("18 ta", "18")],
        [Markup.callbackButton("15 ta", "15")],
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
  ctx.answerCbQuery(`Javobingiz Noto'g'ri`);
});

bot.action("O’zbek", (ctx) => {
  ctx.editMessageText(
    `3-Savol:\n Respublika maktablarida o’qish qancha tilda olib borilgan?`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("12 ta", "12")],
        [Markup.callbackButton("17 ta", "17")],
        [Markup.callbackButton("18 ta", "18")],
        [Markup.callbackButton("15 ta", "15")],
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
  ctx.answerCbQuery(`Javobingiz Noto'g'ri`);
});

//--------------------------\\

//----------------------------------\\

bot.action("12", (ctx) => {
  ctx.editMessageText(
    `4-Savol:\n Qaysi atama italyancha so’z bo’lib, “boshpana” degan ma’noni anglatadi?`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("proletar", "proletar")],
        [Markup.callbackButton("anterkunft", "anterkunft")],
        [Markup.callbackButton("konservatoriya", "konservatoriya")],
        [Markup.callbackButton("kvartira", "kvartira")],
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
  ctx.session.text += 1;
  ctx.answerCbQuery(`To'g'ri`);
});

bot.action("17", (ctx) => {
  ctx.editMessageText(
    `4-Savol:\n Qaysi atama italyancha so’z bo’lib, “boshpana” degan ma’noni anglatadi?`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("proletar", "proletar")],
        [Markup.callbackButton("anterkunft", "anterkunft")],
        [Markup.callbackButton("konservatoriya", "konservatoriya")],
        [Markup.callbackButton("kvartira", "kvartira")],
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
  ctx.answerCbQuery(`Javobingiz Noto'g'ri`);
});

bot.action("18", (ctx) => {
  ctx.editMessageText(
    `4-Savol:\n Qaysi atama italyancha so’z bo’lib, “boshpana” degan ma’noni anglatadi?`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("proletar", "proletar")],
        [Markup.callbackButton("anterkunft", "anterkunft")],
        [Markup.callbackButton("konservatoriya", "konservatoriya")],
        [Markup.callbackButton("kvartira", "kvartira")],
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
  ctx.answerCbQuery(`Javobingiz Noto'g'ri`);
});

bot.action("15", (ctx) => {
  ctx.editMessageText(
    `4-Savol:\n Qaysi atama italyancha so’z bo’lib, “boshpana” degan ma’noni anglatadi?`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("proletar", "proletar")],
        [Markup.callbackButton("anterkunft", "anterkunft")],
        [Markup.callbackButton("konservatoriya", "konservatoriya")],
        [Markup.callbackButton("kvartira", "kvartira")],
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
  ctx.answerCbQuery(`Javobingiz Noto'g'ri`);
});

//------------------------------\\

//-----------------------------------\\

bot.action("proletar", (ctx) => {
  ctx.answerCbQuery(`Javobingiz noto'g'ri`);
  ctx.editMessageText(
    `Siz berilgan 4 ta savoldan ${ctx.session.text}tasiga to'g'ri javob berdingiz.`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
});

bot.action("anterkunft", (ctx) => {
  ctx.answerCbQuery(`Javobingiz noto'g'ri`);
  ctx.editMessageText(
    `Siz berilgan 4 ta savoldan ${ctx.session.text}tasiga to'g'ri javob berdingiz.`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
});
bot.action("konservatoriya", async (ctx) => {
  ctx.answerCbQuery(`Javobingiz noto'g'ri`);
  ctx.editMessageText(
    `Siz berilgan 4 ta savoldan ${ctx.session.text}tasiga to'g'ri javob berdingiz.`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
});

bot.action("kvartira", (ctx) => {
  ctx.session.text += 1;
  ctx.editMessageText(
    `Siz berilgan 4 ta savoldan ${ctx.session.text}tasiga to'g'ri javob berdingiz.`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("◀️ Ortga", "savollar")],
      ]),
    }
  );
  ctx.answerCbQuery(`To'g'ri`);
});

//-----------------------------------\\

// manu dars

// bot.action('dars', ctx =>{
//     ctx.editMessageText(`1-Savol:\nalik`,{
//         reply_markup: Markup.inlineKeyboard([
//             [Markup.callbackButton('oshada','osha')],
//             [Markup.callbackButton('oshada','osha')],
//             [Markup.callbackButton('◀️ Ortga','ortga1')],
//         ])
//     })
// })
// bot.action('ortga1', ctx =>{
//     ctx.editMessageText(`Ozingiz hohlagan savol toplamiga kiring`,{
//         reply_markup: Markup.inlineKeyboard([
//             [Markup.callbackButton('Savollar','savollarr')],
//             [Markup.callbackButton('Dars boyicha','dars')],
//             [Markup.callbackButton('◀️ Ortga ','chiqish')],
//         ])
//     })
// })

// Qiziqarli malumotlar

// aksirish
bot.action("qiziqarli", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/aksirish.jpg",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("Oldinga▶️", "oldinga1")],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Aksirishni ushlab turish xavflimi?\nAgar siz ushbu savolga javobni Internetdan qidirib ko'rsangiz, aniq javob topa olmaysiz. Endi biz muammoga oydinlik kiritish uchun to'g'ri javobni beramiz.\n\nAksirishni ushlab turish inson tanasiga zararli. Ushbu jarayonni tez-tez e'tiborsiz qoldirish quloq-tomoq yo’liga xavf tug’dirishi mumkin. Ko'pincha o'zlarini aksirish istagidan qaytaruvchi odamlarda quloq, quloq pardasi va shuningdek, ko'z tizimi bilan bog'liq muammolari mavjud bo'ladi.\nShifokorning xulosasi qanday? Aksirish zararli emas, aksincha uni ushlab turish inson organizmi uchun xavfli bo’lishi mumkin.`,
    }
  );
});
// bot.action("menu", (ctx) => {
//   ctx.deleteChatPhoto(), ctx.deleteMessage();
//   ctx.replyWithHTML(
//     `Assalomu Alaykum
// Tanlovingizni tanlang:!!👇👇`,
//     {
//       reply_markup: Markup.inlineKeyboard([
//         [Markup.callbackButton("Uzbekiston Vikipediya", "uzbekiston")],
//         [Markup.callbackButton("Savollar", "savollar")],
//         [Markup.callbackButton("Qiziqarli malumotlar", "qiziqarli")],
//         [Markup.callbackButton("Video Darslar", "video")],
//       ]),
//     }
//   );
// });

//qish fasli
bot.action("oldinga1", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/qish.jpg",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "qiziqarli"),
          Markup.callbackButton("Oldinga▶️", "oldinga2"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Kimdir uchun qish eng yoqimli palla bo'lsa, boshqalar uchun bu yilning eng “yoqimsiz” davri. Hammasi unga qanday qarashingizga bog'liq - ba'zi odamlar ayoz, momiq qor va qor bilan qoplangan landshaftni yoqtirishadi, kimdir qishda faqat loy hamda sovuqni ko'radi. Qizig'i shundaki, dunyo aholisining qariyb yarmi umrida hech qachon haqiqiy qorni ko'rmagan.\n\nQish - bizning mamlakatimizda bu dekabr, yanvar va fevral oylari mehmon bo’lsa, janubiy yarimsharda - iyun, iyul va avgust oylarida mehmon bo’ladi. Astronomik qish 21dekabrdan 21 martgacha davom etadi. Iqlimli qish kunlik o'rtacha harorat nol darajadan pastga tushganda keladi.\nBa'zan qish hukmdorlardan birining buyrug'i bilan kelishi mumkin. Qanday qilib deysizmi? Bir paytlar Fransiya qiroli Lyudovik XIV yozda chanaga minishni xohladi. Hechqanday muammosiz Versal atrofida darhol tuz va shakardan tayyorlangan qor yo'lagi qurildi.`,
    }
  );
});

// Mafiya
bot.action("oldinga2", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/mafia.jpg",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "oldinga1"),
          Markup.callbackButton("Oldinga▶️", "oldinga3"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Mafiya – dunyoning taniqli va qo’rqinchli jinoiy guruhlari\n\nXIX asr boshlaridan Sitsiliya hududida faoliyat olib borayotgan bu mafiya xalqaro tashkilotga aylangan. Koza Nostra nomi bilan tanilgan ushbu tashkilot barcha sohalar bo’yicha jinoiy guruh hisoblanadi. XX asrdan boshlab asosiy yo’nalishi – banditizm. `,
    }
  );
});

// futboll
bot.action("oldinga3", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/gutbol.jpg",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "oldinga2"),
          Markup.callbackButton("Oldinga▶️", "qiziqarli"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Futbol o’yinining tug’ilgan kun sanasi va qoidalari tarixi haqida\n\nMa'lum bo'lishicha, dunyodagi eng mashhur o'yin – futbol o’zining tug'ilgan kuniga ega. U 26 oktyabrda nishonlanadi. Sana, albatta, shartli, hech kim aniq aytolmaydi. Xo'sh, raqib darvozasiga zarba berishga urinib, yumaloq koptokni tepib, musobaqani tashkil qilish g'oyasi kim tomonidan birinchi bo'lib paydo bo'lgan?\nZamonaviy futbolga juda o'xshash o'yinlar dunyoning turli mamlakatlarida bo'lgan. Ammo zamonaviy futbolni inglizlar dunyoga sovg’a qilganlar. Va bu 1863 yil 26 oktyabrda sodir bo'ldi. Inglizlar ushbu o'yinning asoschilari deb hisoblanishadi. Gap shundaki, 1863 yilgacha futbol o'yinlari uchun yagona qoidalar mavjud emas edi. Ko'pincha, hatto bitta shaharnjamoalari ham o'zaro o'yin o'tkazolmaydilar, chunki ular o'yin qoidalariga nisbatan har xil qarashlarga ega edilar.  `,
    }
  );
});

       // Unversitet haqida


bot.action("haqida", (ctx) => {
  ctx.deleteMessage();
  ctx.replyWithHTML(
    `O‘zbekiston Respublikasining nodavlat oliy ta'lim muassasasi hisoblanmish Diplomat University, O‘zbekiston Respublikasi Vazirlar Mahkamasi huzuridagi Ta'lim sifatini nazorat qilish Davlat inspeksiyasi tomonidan 20.12.2021 sanasida berilgan ОТ 0049-sonli litsenziyasi asosida faoliyat yuritadi.

Diplomat University - yoshlarning bilim olish va ijodiy rivojlanish maskanidir. Universitet talabalarning ta'lim jarayoni va ijtimoiy hayoti-iste'dodlarning maksimal yuzaga chiqishi, qobiliyatning rivojlantirilishi, shu bilan birga, tanlangan mutaxassislikka bosqichma-bosqich va tizimli jalb etilishga mo‘ljallangan va shu asosda tashkillashtirilgan.

Diplomat Universityning asosiy maqsadi-mehnat bozorida dunyoning yetakchi oliy ta'lim muassasalari bitiruvchilari bilan muvaffaqiyatli raqobatlasha oladigan, hamda o‘z biznesiga asos sola oladigan va rivojlantira oladigan malakali mutaxassislarning yangi avlodini tayyorlashdan iboratdir.

Yevropa o‘qitish standartlari (ECTS), yuqori darajadagi pedagogik tarkib, texnologik jihatdan ilg‘or auditoriyalar, talabalar va ularning o‘qituvchilari oldiga qo‘ygan maqsadlariga yetishishlariga o‘z hissasini qo‘shgan holda, Diplomat Universityda ta'lim olish va talabalar hayotini mazmunli hamda qiziqarli qiladi.

Universitetning muhim vazifalari qatoriga universitetni jamiyat va iqtisodiyotning zamonaviy rivojlanish muammolariga samarali javob bera oladigan, mamlakat va xorijda tan olingan ilmiy-ta'lim markaziga aylantirish kiradi.

Universitet ta’lim jarayonini takomillashtirish yo‘lida zamonaviy yuqori sifatli uskunalarga sarmoya kiritish va eng yangi texnologiyalarni joriy etish orqali dinamik akademik muhit uchun zarur infrastrukturaning keyingi rivojini rejalashtirmoqda. Yoshlarning oliy ta'limga bo‘lgan tez o‘sib borayotgan ehtiyojlarini qondirish uchun, Diplomat University Toshkentda yangi o‘quv binosini qurishni rejalashtirmoqda.

Diplomat Universityning xususiyatlari:

-Mustaqil ta'limga urg‘u beruvchi European Credit Transfer and Accumulation System (ECTS) kredit tizimi;

-Moslashuvchan ta'lim yo‘nalishi va yo‘nalish bo‘yicha mutaxassislikni tanlash shartlari;

-Raqamli Learning Management System (LMS) bo‘yicha ta’lim;

-Diqqatni natijalarga qaratgan ta’lim muassasasi;

-Amaliyot va bozorning rivojlanish tendensiyalarini hisobga olgan holda, muttasil takomillashtirish.

Diplomat University-mamlakat kelajak avlodiga g‘amxo‘rlik bilan!`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
    }
  );
});



// bot.action("haqida", async (ctx) => {
//   ctx.deleteMessage();
//   bot.telegram.sendPhoto(
//     ctx.chat.id,
//     {
//       source: "./media/haqida.jpg",
//     },
//     {
//       reply_markup: Markup.inlineKeyboard([
//         [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
//       ]),
//       caption: `O‘zbekiston Respublikasining nodavlat oliy ta'lim muassasasi hisoblanmish Diplomat University, O‘zbekiston Respublikasi Vazirlar Mahkamasi huzuridagi Ta'lim sifatini nazorat qilish Davlat inspeksiyasi tomonidan 20.12.2021 sanasida \n\n berilgan ОТ 0049-sonli litsenziyasi asosida faoliyat yuritadi. \n\n Diplomat University - yoshlarning bilim olish va ijodiy rivojlanish maskanidir. Universitet talabalarning ta'lim jarayoni va ijtimoiy hayoti-iste'dodlarning maksimal yuzaga chiqishi, qobiliyatning rivojlantirilishi, shu bilan birga, tanlangan mutaxassislikka bosqichma-bosqich va tizimli jalb etilishga mo‘ljallangan va shu asosda tashkillashtirilgan. \n\n Diplomat Universityning asosiy maqsadi-mehnat bozorida dunyoning yetakchi oliy ta'lim muassasalari bitiruvchilari bilan muvaffaqiyatli raqobatlasha oladigan, hamda o‘z biznesiga asos sola oladigan va rivojlantira oladigan malakali mutaxassislarning yangi avlodini tayyorlashdan iboratdir. \n\n Yevropa o‘qitish standartlari (ECTS), yuqori darajadagi pedagogik tarkib, texnologik jihatdan ilg‘or auditoriyalar, talabalar va ularning o‘qituvchilari oldiga qo‘ygan maqsadlariga yetishishlariga o‘z hissasini qo‘shgan holda, Diplomat Universityda ta'lim olish va talabalar hayotini mazmunli hamda qiziqarli qiladi. \n\n Universitetning muhim vazifalari qatoriga universitetni jamiyat va iqtisodiyotning zamonaviy rivojlanish muammolariga samarali javob bera oladigan, mamlakat va xorijda tan olingan ilmiy-ta'lim markaziga aylantirish kiradi. \n\n Universitet ta’lim jarayonini takomillashtirish yo‘lida zamonaviy yuqori sifatli uskunalarga sarmoya kiritish va eng yangi texnologiyalarni joriy etish orqali dinamik akademik muhit uchun zarur infrastrukturaning keyingi rivojini rejalashtirmoqda. Yoshlarning oliy ta'limga bo‘lgan tez o‘sib borayotgan ehtiyojlarini qondirish uchun, Diplomat University Toshkentda yangi o‘quv binosini qurishni rejalashtirmoqda. \n\n Diplomat Universityning xususiyatlari: \n\n -Mustaqil ta'limga urg‘u beruvchi European Credit Transfer and Accumulation System (ECTS) kredit tizimi; \n\n -Moslashuvchan ta'lim yo‘nalishi va yo‘nalish bo‘yicha mutaxassislikni tanlash shartlari; \n\n -Raqamli Learning Management System (LMS) bo‘yicha ta’lim; \n\n -Diqqatni natijalarga qaratgan ta’lim muassasasi; \n\n -Amaliyot va bozorning rivojlanish tendensiyalarini hisobga olgan holda, muttasil takomillashtirish. \n\n Diplomat University-mamlakat kelajak avlodiga g‘amxo‘rlik bilan! `,
//     }
//   );
// });

     // Tez tez soraladigan savollar //


bot.action("unversavol", (ctx) => {
  ctx.deleteMessage();
  ctx.replyWithHTML(
    `Assalomu Alaykum
Tanlovingizni tanlang:!!👇👇`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("DU da qaysi ta'lim yo'nalishlari  bor?", "1")],
        [Markup.callbackButton("DU da ta’lim qaysi tilda olib boriladi?", "2")],
        [Markup.callbackButton("DU da o‘quv yili uchun kontrakt narxi qancha?", "3")],
        [Markup.callbackButton("DU ga o‘qishni boshqa oliy ta’limga ko‘chirish qanday?", "4")],
        [Markup.callbackButton("DU da o‘quv jadvali qanday?", "5")],
        [Markup.callbackButton("DU ga hujjatlarni topshirish tartibi qanday?", "6")],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
    }
  );
});

// 1

bot.action("1", (ctx) => {
  ctx.deleteMessage();
  ctx.replyWithHTML(
    `Savol: Diplomat Universityda bakalavriaturada qaysi ta’lim yo‘nalishlar va magistraturada qanday mutaxassisliklar mavjud?

Javob: Hozirda, DUda quyidagi ta’lim yo‘nalishlari bo‘yicha abituriyentlar bakalavriaturaga qabul qilinmoqda:

1.    Axborot texnologiyalari (dasturlashga yo‘naltirilgan).

Ta’lim shakllari kunduzgi (4 yil) va sirtqi (5 yil).

2.    Iqtisodiyot (moliyaga yo‘naltirilgan).

3.    Arab filologiyasi (pedagogikaga yo‘naltirilgan (bakalavriatura, kunduzgi ta’lim shakli)).

4.    Ingliz filologiyasi (pedagogikaga yo‘naltirilgan (bakalavriatura, kunduzgi ta’lim shakli)).

5.    Xitoy filologiyasi (tijoratga yo‘naltirilgan (bakalavriatura, kunduzgi ta’lim shakli)).

6.    Xalqaro munosabatlar (diplomatiyaga yo‘naltirilgan (bakalavriatura, kunduzgi ta’lim shakli)).

7.    Biznes boshqaruvi (bakalavriatura, kunduzgi va sirtqi ta’lim shakllari).

8.    Biznes huquqi (xalqaro tijorat huquqiga yo‘naltirilgan (magistratura, masofaviy ta’lim shakli-1 yil).

9.    Biznes boshqaruvi MBA (magistratura, masofaviy ta’lim shakli-1 yil).

Ta’lim shakllari kunduzgi (4 yil) va sirtqi (5 yil).

Magistraturaga hali qabul ochilmagan.`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("◀️Ortga", "unversavol")],
      ]),
    }
  );
});

// 2

bot.action("2", (ctx) => {
  ctx.deleteMessage();
  ctx.replyWithHTML(
    `Savol: Diplomat Universityda ta’lim qaysi tilda olib boriladi?

 Javob: DUda ta’lim o‘zbek tilida olib boriladi. Boshlang‘ich bosqichlardagi muayyan fanlar rus tilida, yuqori bosqichlarda esa ingliz tilida o‘tiladi. Shu munosabat bilan, boshlang‘ich bosqichlarda o‘zbek va rus tillarini bilish majburiy hisoblanadi. IELTS (TOEFL, CEFR) sertifikatlarining mavjudligi abituriyentni ingliz tilidan kirish imtihonini topshirishdan ozod qiladi va uning DU talabalari safiga qabul qilinishini ta’minlaydi.`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("◀️Ortga", "unversavol")],
      ]),
    }
  );
});

// 3

bot.action("3", (ctx) => {
  ctx.deleteMessage();
  ctx.replyWithHTML(
    `Savol: Diplomat Universityda bir o‘quv yili uchun kontrakt narxi qancha?

 Javob: DUda o‘qish uchun to‘lov bir yilga kunduzgi ta’lim shakli uchun 24 mln so‘m, sirtqi ta’lim shakli uchun esa 18 mln so‘mni tashkil qiladi.`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("◀️Ortga", "unversavol")],
      ]),
    }
  );
});

// 4

bot.action("4", (ctx) => {
  ctx.deleteMessage();
  ctx.replyWithHTML(
    `Savol: Diplomat Universityga o‘qishni boshqa oliy ta’lim muassasasidan ko‘chirish tartibi qanday?

Javob: DUga (O‘zbekiston Respublikasi va xorijiy mamlakatlarning OTMlaridan) o‘qishni ko‘chirish DUda belgilangan tartibga muvofiq amalga oshiriladi. O‘qishni faqat 1 va 2-bosqichda mos va turdosh yo‘nalishga ko‘chirish mumkin. DUga qo‘shma ta’lim dasturlaridan o‘qishni ko‘chirish amalga oshirilmaydi. O‘qishni ko‘chirayotganda kreditlararo tafovut yuzaga kelsa, talaba mazkur kreditlarni o‘zlashtirishi va ularning to‘lovini DUda belgilangan tartibda amalga oshirishi lozim.`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("◀️Ortga", "unversavol")],
      ]),
    }
  );
});

// 5

bot.action("5", (ctx) => {
  ctx.deleteMessage();
  ctx.replyWithHTML(
    `Savol: Diplomat Universityda o‘quv jadvali qanday?

Javob: DUda darslar 5 kun, dushanbadan jumagacha o‘tiladi. Bir kunda uchtagacha para dars o‘tilib, bir semestrda o‘rtacha beshta fandan saboq olinadi (30 ta kredit).`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("◀️Ortga", "unversavol")],
      ]),
    }
  );
});

// 6

bot.action("6", (ctx) => {
  ctx.deleteMessage();
  ctx.replyWithHTML(
    ` Savol: Diplomat University qabul komissiyasiga hujjatlarni topshirish tartibi qanday?

 Javob: Abituriyentlar hujjatlarni onlayn tarzda quyidagi elektron manzil orqali: https://apply.diplomat.university/

yoki DUning qabul komissiyasiga kelib topshirishlari mumkin (Manzil: Toshkent sh., Sayilgoh ko‘chasi, 1).

DUga hujjat topshirish uchun va imtihonlarda ishtirok etgani uchun hech qanday to‘lov talab etilmaydi!

Qo‘shimcha ma’lumotlar uchun:

E-mail: http://info@diplomat.university/

Tel.: +998881248888, +998881268888

        +998712024555`,
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("◀️Ortga", "unversavol")],
      ]),
    }
  );
});

// Hamkorlar

// Khazar

bot.action("hamkorlar", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/khazar.jpg",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [Markup.callbackButton("Oldinga▶️", "tojik")],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Hazar universiteti Diplomat Universityning yangi hamkori
2022-yilning 10-oktyabrida Ozarbayjon tomoni taklifiga binoan, Diplomat University rektori Elyor Maxmudov Hazar universitetiga tashrif buyurdi. Uchrashuvda Hazar universiteti asoschisi, direktorlar va vasiylar kengashi raisi Gamlet Isahonli va rektori Irada Xalilova bilan universitetlararo hamkorlik istiqbollari muhokama qilindi. Uchrashuv yakunida ta’lim va fan sohalaridagi hamkorlikni ko‘zda tutuvchi Anglashuv memorandumi imzolandi.
Hazar universiteti 1991-yilda tashkil etilgan, Ozarbayjonning birinchi xususiy universiteti va Ozarbayjon Respublikasidagi oliy taʼlim va fanning yetakchi flagmanlaridan biri hisoblanadi. Universitet QS xalqaro universitetlar reytingida top-800 ga kirgan OTMdir.`,
    }
  );
});

// Tojik 

bot.action("tojik", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/tojik.png",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "hamkorlar"),
          Markup.callbackButton("Oldinga▶️", "panjob"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Panjikent shahridagi Tojikiston pedagogika instituti Diplomat Universityning yangi hamkori
2022-yilning 12-iyul kuni DU rektori E. Maxmudov Panjikent shahridagi Tojikiston pedagogika instituti ta’sischisi va rektori Ansori Muazzamxon bilan uchrashuv o‘tkazdi va unda ta’lim muassasalari o‘rtasida Anglashuv memorandumi imzolandi. Mazkur ta’lim muassasasi Tojikiston Respublikasidagi bolalar bog‘chasi, maktab, kollej, texnopark va 7 ta ishlab chiqarish korxonalarini o‘z ichiga olgan birinchi va yagona xususiy OTMdir`,
    }
  );
});

// panjob

bot.action("panjob", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/panjob.jpg",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "tojik"),
          Markup.callbackButton("Oldinga▶️", "misr"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Panjob universiteti Diplomat Universityning yangi hamkori
2022-yilning 5-iyulida Pokiston tomoni taklifiga binoan, Diplomat University rektori Elyor Maxmudov Panjob universitetiga tashrif buyurdi. Uchrashuvda Panjob universiteti rektori Salim Mazhar bilan universitetlararo hamkorlik istiqbollari muhokama qilindi. Uchrashuv yakunida ta’lim va fan sohalaridagi hamkorlikni ko‘zda tutuvchi Anglashuv memorandumi imzolandi.
Panjob universitetiga 1882-yili asos solingan bo‘lib, mamlakatdagi ilk universitet hamda Pokiston oliy ta’limi va fanining yetakchilaridan biri hisoblanadi. Universitet QS universitetlar xalqaro reytingida 800–o‘rinni egallagan bo‘lib, Nobel mukofotining 3 nafar sovrindorini tayyorlagan. `,
    }
  );
});

// misr

bot.action("misr", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/misr.png",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "panjob"),
          Markup.callbackButton("Oldinga▶️", "koreya"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Misrning Helvon universiteti Diplomat Universityning yangi hamkori
2022-yil 7-iyun kuni Diplomat University rektori Elyor Maxmudov va Helvon universiteti prezidenti Mamduh Mahdi akademik hamkorlik uchun protokol imzoladilar. Hujjatda universitetlararo hamkorlikni rivojlantirish ko‘zda tutilgan.
Shu bilan birga, tomonlar Helvon universiteti DU "Arab filologiyasi" (pedagogikaga yo‘naltirilgan) ta'lim dasturining hamkori bo‘lish imkoniyatini ham ko‘rib chiqishi haqida kelishib oldilar.
Helvon universiteti Qohira shahrida 1975-yilda tashkil etilgan bo‘lib, Yaqin va O‘rta Sharqda yetakchi universitetlardan biri hisoblanadi. `,
    }
  );
});

// koreya

bot.action("koreya", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/koreya.jpg",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "misr"),
          Markup.callbackButton("Oldinga▶️", "budapesht"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Koreya Respublikasining Kyonson universiteti Diplomat Universityning yangi hamkori
Avval xabar berilganidek, 2022-yilning 13-may kuni Diplomat University va Kyonson universiteti rahbariyati o‘rtasida onlayn uchrashuv bo‘lib o‘tgan edi. Uchrashuv yakunlari bo‘yicha tomonlar o‘zaro Anglashuv memorandumini ishlab chiqdilar, unda ta’lim va fan sohalaridagi hamkorlikning asosiy yo’nalishlari belgilab olindi. 2022-yilning 15-iyunida ikki universitet rahbariyati – DU rektori Elyor Maxmudov va Kyonson universiteti prezidenti So Gyon Song ushbu Memorandumni imzoladila `,
    }
  );
});

// budapesht

bot.action("budapesht", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/budapesht.png",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "koreya"),
          Markup.callbackButton("Oldinga▶️", "indoneziya"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Etvosh Loran nomidagi Budapesht universiteti Diplomat Universityning yangi hamkori
2022–yilning 30–mayida Diplomat University Etvosh Loran nomidagi Budapesht universiteti bilan hamkorlik o‘rnatdi. Ikki universitet rektorlari Elyor Maxmudov va Laslo Borkilar o‘rtasida Anglashuv memorandumi imzolandi. Memorandumda ta’lim va fan sohalaridagi hamkorlik ko‘zda tutilgan.

Etvosh Loran nomidagi Budapesht universiteti 1635–yilda tashkil etilgan bo‘lib, mamlakatdagi birinchi universitet hamda Vengriya oliy ta'lim va fanning yetakchi flagmanlaridan biri hisoblanadi. Universitet QS universitetlar xalqaro reytingida 650–o‘rinni egallagan bo‘lib, Nobel mukofotining 5 nafar sovrindorlarini tayyorlagan`,
    }
  );
});

//indoneziya

bot.action("indoneziya", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/indaneziya.jpg",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "budapesht"),
          Markup.callbackButton("Oldinga▶️", "xitoy"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Indoneziyaning Islom Malang Universiteti Diplomat Universityning yangi hamkori
2022-yilning 28-aprelida Diplomat University va Islom Malang Universiteti o‘rtasida onlayn tarzda o‘zaro Anglashuv memorandumini imzolash marosimi bo‘lib o‘tdi. Unda Diplomat University rektori Elyor Maxmudov, rektor maslahatchisi Alisher Shayxov va Islom Malang universiteti rektori Maskuri Bakrilar ishtirok etdilar.

Marosimda mazkur memorandumning ahamiyati, ikki universitet talabalari uchun ochilayotgan yangi imkoniyatlarga urg‘u berildi.

Ushbu marosimini quyidagi havola orqali tomosha qilish mumkin:

https://youtu.be/NC7k5iT9Fdc `,
    }
  );
});

//xitoy

bot.action("xitoy", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/xitoy.jpg",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "indoneziya"),
          Markup.callbackButton("Oldinga▶️", "qirgiz"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Xitoyning Lyaonin pedagogika universiteti Diplomat Universityning yangi hamkori
Diplomat University rektori Elyor Maxmudov va Lyaonin pedagogika universiteti prezidenti Yuan Siaojie o‘zaro Anglashuv memorandumini imzoladilar. Hujjatda universitetlararo hamkorlikni rivojlantirish ko‘zda tutilgan.

Shu bilan birga, tomonlar biznes va savdoga urg‘u berilgan xitoy filologiyasi bo‘yicha qo‘shma diplom dasturini ishlab chiqishga kelishib oldilar.

LPUga 1951-yilda Dalyan shahrida asos solingan bo‘lib, Xitoy Xalq Respublikasi Lyaonin provinsiyasidagi yetakchi universitetlardan biri hisoblanadi. `,
    }
  );
});

// qirgiz

bot.action("qirgiz", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/qirgiz.png",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "xitoy"),
          Markup.callbackButton("Oldinga▶️", "tehron"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Qirg‘iziston xalqaro universiteti Diplomat Universityning yangi hamkori
2022-yilning 20-aprel kuni Diplomat University rektori Elyor Maxmudov va “Qirg‘iziston xalqaro universiteti” Akademik Konsorsiumi vasiylik kengashi raisi Asilbek Aydaraliev o‘rtasida hamkorlik memorandumi imzolandi. Hujjatda ta’lim va ilmiy tadqiqotlar sohasida universitetlararo hamkorlikni rivojlantirish, mobillik dasturlari bo'yicha tajriba almashish hamda talabalar, o‘qituvchilar va xodimlarning amaliyot, stajirovka o‘tashlarini tashkil etish va boshqalar ko‘zda tutilgan.

Qirg‘iziston xalqaro universiteti 1993-yilda tashkil etilgan, mamlakatdagi xalqaro maqomga ega bo‘lgan birinchi universitet bo‘lib, Qirg‘iziston Respublikasidagi oliy ta’lim va fanning yetakchi flagmanlaridan biri hisoblanadi. 2017-yilda universitet turli darajadagi bir qator ta’lim, ilmiy va ishlab chiqarish muassasalarini o‘z ichiga olgan “Qirg‘iziston xalqaro universiteti” Akademik konsorsiumiga aylandi. `,
    }
  );
});

// tehron

bot.action("tehron", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/tehron.png",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "qirgiz"),
          Markup.callbackButton("Oldinga▶️", "istanbul"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Tehron universiteti Diplomat Universityning yangi hamkori
Diplomat University rektori Elyor Maxmudov va Tehron universiteti prezidenti Seyed Muhammad Mogimi o‘zaro Anglashuv memorandumini imzoladilar. Hujjatda universitetlararo hamkorlikni rivojlantirish ko‘zda tutilgan.

Tehron universiteti 1851-yili tashkil etilgan bo‘lib, mamlakatdagi birinchi universitet hamda Eron Islom Respublikasi oliy ta’lim va fanning yetakchi flagmanlaridan biri hisoblanadi. QS universitetlar xalqaro reytingida 521-o‘rinni, US News reytingida esa 353-o‘rinni egallaydi. `,
    }
  );
});

//istanbul

bot.action("istanbul", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/istanbul.png",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "tehron"),
          Markup.callbackButton("Oldinga▶️", "belarus"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Istanbul tijorat universiteti Diplomat Universityning yangi hamkori
2022-yilning 14-aprel kuni Diplomat University rektori Elyor Maxmudov va Istanbul tijorat universiteti rektori Yujel O‘g‘urlu o'zaro Anglashuv memorandumini imzoladilar. Hujjat universitetlararo hamkorlikni rivojlantirishni nazarda tutadi.

Shu bilan birga, tomonlar DU “Biznes boshqaruvi” ta’lim dasturiga Istanbul tijorat universiteti hamkor bo‘lish imkoniyatlarini ham ko‘rib chiqishga kelishib oldilar.

Istanbul tijorat universiteti 2001-yilda tashkil etilgan bo‘lib, uning asoschisi dunyodagi eng qadimgi Savdo palatalaridan biri – Istanbul Savdo palatasi hisoblanadi. Universitet Turkiyaning iqtisod, moliya va biznes boshqaruvi bo‘yicha yetakchi universitetlaridan biri hisoblanadi.`,
    }
  );
});

//belarus

bot.action("belarus", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/belarus.png",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "istanbul"),
          Markup.callbackButton("Oldinga▶️", "afgoniston"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Belarus davlat universiteti Diplomat Universityning yangi hamkori
2022-yil 11-aprel kuni Diplomat University rektori E.Maxmudov Belarus davlat universitetining o‘quv ishlari va ta’lim internatsionalizatsiyasi bo‘yicha prorektori Konstantin Kozadayev bilan onlayn uchrashuv o‘tkazdi.

Uchrashuvda universitetlararo hamkorlik istiqbollari muhokama qilindi va uchrashuv yakunida Hamkorlik shartnomasi imzolandi. Bitim taʼlim va fan sohalarida hamkorlikni, shu jumladan, ikki diplomli dasturlarni ishlab chiqish va talabalar amaliyotini o‘tkazishni nazarda tutadi.

BDU 1921-yilda tashkil etilgan bo‘lib, mamlakatdagi birinchi universitet hamda Belarus Respublikasi oliy taʼlim va fanning yetakchi flagmanlaridan biri hisoblanadi. QS universitetlar xalqaro reytingida 295-o‘rinni egallaydi. `,
    }
  );
});

// afgoniston

bot.action("afgoniston", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/afgoniston.png",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "belarus"),
          Markup.callbackButton("Oldinga▶️", "qozoq"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Afg‘onistonning Balx universiteti Diplomat Universityning yangi hamkori
Diplomat University Afg‘onistonning Balx universiteti bilan hamkorlikni yo‘lga qo‘ydi. O‘zaro Anglashuv memorandumi ikki universitet rektorlari Elyor Maxmudov va Xalilulloh Klival tomonidan imzolandi. Memorandum taʼlim va fan sohalarida hamkorlikni nazarda tutadi.
Taniqli afg‘onshunos olim, “O‘zbekiston-Afg‘oniston” Do‘stlik Jamiyati raisi, professor Abdurahim Mutalovich Mannanov ta’kidladi: “O‘zbekiston Prezidenti qo‘shni Afg‘oniston bilan o‘zaro manfaatli hamkorlikni, jumladan, ta’lim sohasini rivojlantirishga katta e’tibor qaratmoqda. O‘zbekiston afg‘on muammosi bo‘yicha xalqaro maydonda muhim o‘rinlardan birini egallab, u yerda yirik infratuzilma loyihalarini amalga oshirmoqda. Quvonarlisi shundaki, Diplomat University yangi xususiy oliy o‘quv yurti bo‘lib, davr talablariga mos holda Afg‘oniston universiteti bilan hamkorlik qila boshladi. Do‘stlik jamiyatimiz ushbu tashabbusni qo‘llab-quvvatlagan holda, Diplomat University bilan kelgusida hamkorlik qilishga tayyor”. `,
    }
  );
});

//qozoq

bot.action("qozoq", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/qozoq.png",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "afgoniston"),
          Markup.callbackButton("Oldinga▶️", "rossiya"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Al-Farobiy nomidagi Qozoq milliy universiteti Diplomat Universityning yangi hamkori
2022-yilning 6-aprel kuni Qozog‘iston Milliy universitetining internatsionalizatsiya va tijoratlashtirish bo‘yicha prorektori Mehmet Arslan Diplomat universitetiga tashrif buyurdi.

DU rektori E.Maxmudov bilan uchrashuv mobaynida, universitetlararo hamkorlik istiqbollari muhokama qilindi. Uchrashuv yakunida, Diplomat University va Al-Farobiy nomidagi Qozoq milliy universiteti o‘rtasida o‘zaro Anglashuv memorandumi imzolandi.

QozMU 1934-yilda tashkil topgan bo‘lib, mamlakatdagi birinchi universitet hamda Qozog‘iston Respublikasi oliy taʼlim va fanning yetakchi flagmanlaridan biri hisoblanadi. QS universitetlarining xalqaro reytingida 175-o‘rinni egallab, QS bo‘yicha a'lo darajadagi "5 yulduz" bilan taqdirlangan. `,
    }
  );
});

//rossiya

bot.action("rossiya", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/rossiya.png",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "qozoq"),
          Markup.callbackButton("Oldinga▶️", "qozon"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Sankt-Peterburg davlat universiteti Diplomat Universityning yangi hamkori
2022-yil 1-aprel kuni Sankt-Peterburg davlat universiteti prorektori Sergey Andryushin Diplomat Universityga tashrif buyurdi.
DU rektori E.Maxmudov bilan o‘tgan uchrashuvda universitetlararo hamkorlik, shu jumladan, “Xalqaro munosabatlar” ta’lim yo‘nalishi bo‘yicha qo‘shma ta’lim (ikki diplomli) dasturini ishlab chiqish imkoniyatlari muhokama qilindi.
Uchrashuv yakunida Diplomat University va Sankt-Peterburg davlat universiteti o‘rtasida hamkorlik shartnomasi imzolandi.
Sankt-Peterburg davlat universiteti-Yevropa va dunyodagi eng yirik ilmiy-ta'lim markazlaridan biridir. Bugungi kunda bu yerda 20 000 dan ziyod talaba tahsil olmoqda, Nobel va Fields mukofotlari sovrindorlari faoliyat yuritmoqda, mamlakatning yetakchi ilmiy parkiga kiruvchi 15 dan ortiq yirik laboratoriyalar va 23 ta resurs markazlari tashkil etildi. Universitet boy tarixga ega bo‘lib, 1724-yili tashkil etilgan va Rossiyaning birinchi universiteti hisoblanadi. 
Sankt-Peterburg davlat universitetining bitiruvchilari orasida mamlakat hukumatining oltita raisi va Rossiya Federatsiyasining ikki prezidenti bor. Universitetda to‘qqiz nafar Nobel mukofoti sovrindorlari tahsil olgan va faoliyat yuritgan. Sankt-Peterburg davlat universiteti o‘z qoidalariga muvofiq dissertatsiyalarni himoya qilish va davlat tomonidan e'tirof etilgan fan nomzodlari va fan doktorlari ilmiy darajalarini berish huquqiga ega.
Universitet barcha darajadagi 400 dan ortiq ta'lim dasturlari, 300 dan ortiq onlayn kurslar, shuningdek, 750 dan ortiq qo‘shimcha ta'lim dasturlarini amalga oshiradi. Sankt-Peterburg davlat universiteti olimlari ilm deyarli barcha sohalarda ilmiy tadqiqotlar olib bormoqda, Rossiya va chet elda ekspert va maslahatchilik  faoliyatini amalga oshiroqdalar.
500 ga yaqin xorijiy oliy o‘quv yurtlari va tashkilotlar universitetning hamkorlaridir.`,
    }
  );
});

//qozon

bot.action("qozon", async (ctx) => {
  ctx.deleteMessage();
  bot.telegram.sendPhoto(
    ctx.chat.id,
    {
      source: "./media/qozon.jpg",
    },
    {
      reply_markup: Markup.inlineKeyboard([
        [
          Markup.callbackButton("◀️ Ortga", "rossiya"),
        ],
        [Markup.callbackButton("◀️ Menyuga qaytish", "chiqish")],
      ]),
      caption: `Qozon Federal Universiteti Diplomat Universityning yangi hamkori
Uchrashuvda DU rektori Elyor Maxmudov, QFU o‘quv ishlari bo‘yicha prorektori Timirxan Alishev va QFU Boshqaruv, iqtisodiyot va moliya instituti direktori Nailya Bagautdinovalar ishtirok etishdi.

Tomonlar 2022-2023-o‘quv yilidan boshlab, iqtisod (moliyaga e’tibor qaratgan holda) va axborot texnologiyalari (dasturlashga e’tibor qaratgan holda) ta’lim yo‘nalishlari bo‘yicha qo‘shma ta’lim dasturlarini yo‘lga qo‘yish yuzasidan kelishib oldilar.

QFU Rossiyaning yetakchi taʼlim va ilmiy markazlaridan biri bo‘lib, QS reytingi bo‘yicha dunyodagi eng yaxshi 350 ta universitetlar qatoriga kiradi.`,
    }
  );
});


/// lider

bot.action("lider", (ctx) => {
  ctx.deleteMessage();
  ctx.replyWithHTML(`O'zingizga yoqgan To'garagingizni tanlang! `, {
    reply_markup: Markup.inlineKeyboard([
      [Markup.callbackButton("Sport", "sport")],
      [Markup.callbackButton("Kompyuter Texnologiyalari", "kompyuter")],
      [Markup.callbackButton("Ekonomika", "ekonomika")],
      [Markup.callbackButton("◀️ Ortga ", "chiqish")],
    ]),
  });
});

///////   rektorga murojat




// bot.action("rektor", (ctx) => {
//   ctx.deleteMessage();
//   ctx.replyWithHTML(`O’zbekiston Respublikasi Vikipediyasi `, {
//     reply_markup: Markup.inlineKeyboard([
//       [Markup.callbackButton("M.Muhammadali", "mali")],
//       [Markup.callbackButton("◀️ Menyuga qaytish ", "chiqish")],
//     ]),
//   });
//   ctx.telegram.sendMessage(
//     KANAL_ID,
//     `<b>Murojotnoma`,
//     { parse_mode: "HTML" }
//   );
//   // break;
// });


// bot.action("mali", async (ctx) => {
//   ctx.session.flag = "murojat1";
//   ctx.editMessageText("To'liq Ismingizni va Fakultetingizni kiriting");
// });

// bot.on("mali", async (ctx) => {
//   text = ctx.message.text;
//   switch (ctx.session.flag) {
//     case "murojat1":
//       console.log(text);
//       ctx.session.murojat = text;
//       ctx.session.flag = "raxmat";
//       ctx.replyWithHTML("Murojatnomangizni kiriting ");

//       break;
//     case "raxmat":
//         ctx.session.murojat1 = text;
//         console.log(text);
//         ctx.session.flag = "";
//         ctx.replyWithHTML(
//           `<b>Murojatingiz uchun Raxmat</b>`,
//           {
//             reply_markup: Markup.inlineKeyboard([
//               [Markup.callbackButton("◀️ Menyuga qaytish ", "chiqish")],
//             ]),
//           }
//         );
//         ctx.telegram.sendMessage(
//           KANAL_ID1,
//           `<b>Foydalanuvching malumoti:</b>\n\nFIO:   <b>${ctx.session.name}</b>\n\nManzil:   <b>${ctx.session.viloyat}</b>\n\nYosh:   <b>${ctx.session.tel}</b>\n\nTelefon Raqami:   <b>${ctx.session.yosh}</b>\n\nMurojatnoma:   <b>${ctx.session.murojat1}</b>`,
//           { parse_mode: "HTML" }
//         );
//       break;
//     default:
//       break;
//   }
// });


// Bot haqida

bot.command("BotHaqida", (ctx) => {
  ctx.replyWithHTML(
    "<b>Assalomu alaykum</b>\n Bot 2021-yil 8-iyun dan boshlanib\n ...kuni tugadi\n Bot admini: @ali_developer04"
  );
});



// help

bot.command("help", (ctx) => {
  ctx.replyWithHTML(
    `Assalomu Alaykum
Sizga qanday yordam kerak
Adminga murojaat qiling!!👇👇`,
    {
      reply_markup: Markup.inlineKeyboard([
        [{ text: "Admin", url: "https://t.me/shukhratov1ch_04" }],
      ]),
    }
  );
});

// bot.action('anonim', (ctx) =>
//     ctx.replyWithQuiz(`nmaga tish ogridi?`,
//     ['Shu', 'U', 'La'],
//     { correct_option_id: 2 })
// );

bot.catch((err) => {
  console.log(err);
});

bot.launch();
