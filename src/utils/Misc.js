const nl2br = (str) => str.replace(/\n/gi, '<br>');
const br2nl = (str) => str.replace(/<br[^>]*>/gi, '\n');
const capitalize = str => str[0].toUpperCase() + str.substr(1);

const makeAttachFormData = argFormData => {
  const formData = {...argFormData}
  const keys = Object.keys(formData);
  const newFormData = new FormData();
  keys.map(key => {
    if (typeof formData[key] !== 'undefined' && (
      formData[key].constructor.name === 'FileList' ||
      formData[key].constructor.name === 'File' ||
      (formData[key].constructor.name === 'Array' && formData[key].length > 0 &&
        formData[key][0].fileInfo && formData[key][0].fileInfo.constructor.name === 'File')
    )) {
      const files = formData[key];
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        newFormData.append(key, new File([file.fileBuffer], file.fileInfo.name, file.fileInfo));
      }
    } else {
      newFormData.append(key, formData[key]);
    }
    return true;
  });
  return newFormData;
};

const isBrowser = () => {
  return process.title === "browser"
}

const delay_ms = (ms) => new Promise((resolve, eject) => {
  setTimeout(() => {
    resolve(true)
  }, ms);
});

const getBodyHTML = (html = "") => {
  const ret = html.match(/<body[^>]*>[\s\S]+<\/body>/gi);
  if (ret) {
    let bodyHTML = ret[0];
    bodyHTML = bodyHTML.replace(/<body[^>]+>/gi, '');
    bodyHTML = bodyHTML.replace(/<\/body>/gi, '');
    return bodyHTML;
  }
  return '';
};

export {
  nl2br,
  br2nl,
  capitalize,
  makeAttachFormData,
  isBrowser,
  delay_ms,
  getBodyHTML
}
