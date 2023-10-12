const ascii = /^[\x00-\x7F]+$/;

export const isAscii = (str) => {
  return ascii.test(str);
};

export const dateString = () => {
  let d = new Date();
  let year = d.getFullYear();
  let month = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
  let day = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();

  return month + '/' + day + '/' + year;
};

export const logDate = () => {
  let d = new Date();
  let yil = d.getFullYear();
  let ay = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
  let gun = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
  let saat = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
  let dakika = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
  let saniye = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();

  return saat + ':' + dakika + ':' + saniye + ' ' + gun + '.' + ay + '.' + yil;
};

export const findMIMEByName = (fileName) => {
  const nameSplitted = fileName.split('.')
  return nameSplitted[nameSplitted.length - 1]
};

export const characterTransformToEN = (word, removeSpace = false) => {
  var g = ""
  for (var char of word) {
    if (removeSpace && char === ' ')
      char = '-'

    g += char.split("ı").join("i").split("İ").join("I").toLowerCase().replace("ğ", "g").replace("ç", "c").replace("ü", "u").replace("ö", "o").replace("ş", "s")
  }

  return g
}