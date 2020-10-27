import {beautifyObject} from "../../cli/libs/beautify_json";

const fs = require('fs');
const JSON_FILE_PATH = './tokens.json';

class TokenManager {
  getToken(key = 'lastLoggedInKey') {
    let jsonText;
    if (fs.existsSync(JSON_FILE_PATH)) {
      jsonText = fs.readFileSync(JSON_FILE_PATH);
      if (jsonText.length === 0) jsonText = "{}"
    } else {
      jsonText = "{}";
    }
    const tokenJson = JSON.parse(jsonText);
    if (key === 'lastLoggedInKey') {
      return tokenJson[tokenJson['lastLoggedInKey']];
    } else {
      return tokenJson[key];
    }
  }

  getLastLoggedInToken() {
    return this.getToken();
  }

  setToken(key, token) {
    let jsonText;
    if (fs.existsSync(JSON_FILE_PATH)) {
      jsonText = fs.readFileSync(JSON_FILE_PATH);
      if (jsonText.length === 0) jsonText = "{}"
    } else {
      jsonText = "{}";
    }
    const tokenJson = JSON.parse(jsonText);
    tokenJson[key] = token;
    tokenJson['lastLoggedInKey'] = key;
    fs.writeFileSync(JSON_FILE_PATH, beautifyObject((tokenJson)));
  }
}

export default new TokenManager();