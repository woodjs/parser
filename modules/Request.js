const axios = require('axios');
const { parse } = require('node-html-parser');

class Request {
  getLinksTopics(url) {
    return axios
      .get(url)
      .then((res) => {
        const dom = parse(res.data);
        const topics = dom.querySelectorAll(
          '.discussionListItems .PreviewTooltip'
        );
        return topics.map((item) => item.getAttribute('href'));
      })
      .catch((err) => new Error(err.message));
  }

  getLinkDownload(url, cookie) {
    return axios
      .get(url, {
        headers: {
          cookie,
        },
      })
      .then((res) => {
        const dom = parse(res.data);

        const btnLink = dom.querySelector('.bdl');
        const file = dom.querySelector('h6.filename a');
        const link = dom.querySelector('.externalLink');

        if (btnLink) {
          return btnLink.getAttribute('href');
        }

        if (file) {
          return file.getAttribute('href');
        }

        if (link) return link.getAttribute('href');

        return { ok: 'bad' };
      })
      .catch((err) => {
        // console.log(err);
        console.log(err.message);
        return { ok: 'error', message: err.message };
      });
  }
}

module.exports = new Request();
