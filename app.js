const reader = require('readline-sync');

const request = require('./modules/Request');
const file = require('./modules/File');

const domain = 'https://forumteam.top';
const pages = 156;
// const block = 31;
const block = 1;
const cookie = reader.question('Cookie: ');

if (!cookie || cookie.length < 1) process.exit(1);

const sleep = (timeout) =>
  new Promise((resolve) => setTimeout(resolve, timeout));

const core = async (url) => {
  try {
    const topics = await request.getLinksTopics(url);
    topics.forEach(async (item) => {
      const link = await request.getLinkDownload(`${domain}/${item}`, cookie);
      if (link.ok === 'bad') {
        console.log(`Ссылка без кнопки скачивания: ${item}`);
        file.saveBad(`${domain}/${item}`);
        return;
      }

      if (link.ok === 'error') {
        file.saveError(`${domain}/${item} | ${link.message}`);
      }
      file.saveSuccess(link);
    });
  } catch (err) {
    // console.log(err.message);
    file.saveError(err.message);
  }
};

(async () => {
  try {
    console.log(
      'Не отключай софт. Он работает. Всего страниц для обработки 156'
    );
    for (let i = block; i <= pages; i += 1) {
      const url = `${domain}/forums/bazy-email-combolist.4/page-${i}?prefix_id=3`;
      console.log(`Запускаем поток: ${i}`);
      await core(url);
      console.log(
        `Поток обработал ссылки и завершил работу. Пауза в 3 секунды`
      );
      await sleep(3000);
    }
  } catch (err) {
    console.log(`Ошибка: ${err.message}`);
    file.saveError(err.message);
  }
})();
