const fs = require('fs');

class File {
  constructor() {
    this.error = 'error.txt';
    this.bad = 'Без ссылок.txt';
    this.success = 'Ссылки.txt';
  }

  saveError(data) {
    fs.appendFileSync(this.error, `${data}\n`);
  }

  saveSuccess(data) {
    fs.appendFileSync(this.success, `${data}\n`);
  }

  saveBad(data) {
    fs.appendFileSync(this.bad, `${data}\n`);
  }
}

module.exports = new File();
