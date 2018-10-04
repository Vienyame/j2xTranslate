'use strict';

const IncomingForm = require('formidable').IncomingForm;
const path = require('path');
const util = require('util');
const fs = require('fs');
const libxmljs = require("libxmljs");
const parseString = require('xml2js').parseString;


const locales = ['fr', 'en'];
let step = 2;

module.exports.upload = (req, res) => {
  const form = new IncomingForm();

  form.parse(req, function (err, fields, files) {
    if (err) return res.status(500).json({error: err});
  });

  form.on('fileBegin', (name, file) => {
    const [fileName, fileExt] = file.name.split('.');
    //file.path = path.join(__dirname + '/data/', `${fileName}_${new Date().getTime()}.${fileExt}`)
  });

  form.on('progress', (bytesReceived, bytesExpected) => {
    console.log('Progress', bytesReceived, bytesExpected)
  });

  form.on('error', (err) => {
    console.error(err)
  });

  /*form.on('aborted', () => {
    console.error(new Error('Aborted'))
  });*/

  form.on('file', (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path

    let rawdata = fs.readFileSync(`${file.path}`);

    let lang = JSON.parse(rawdata);

    const [fileName, fileExt] = file.name.split('.');

    // fs.writeFile(path.join(__dirname + '/data/', `${fileName}_${new Date().getTime()}.vien`), json2vien(lang), function (err) {
    fs.writeFile(path.join(__dirname + '/data/', `${fileName}.vien`), json2vien(lang), function (err) {
      if (err) {
        return console.log(err);
      }

      console.log("The file was saved!");
    });
  });

  form.on('end', () => {
    return res.status(200).json({result: 'Upload Success'});
  });

};

module.exports.template = (req, res) => {

  fs.readFile(path.join(__dirname + '/data/', `fr.vien`), 'utf8', function (err, data) {

    if (!data) {
      return res.status(404).json({error: 'Le template' + '" n\'existe pas.'});
    }

    return res.status(200).json(data);

  });

};

module.exports.vien2json = (req, res) => {

  let xml = req.rawBody;

  parseString(xml, {explicitArray: false, ignoreAttrs: true, trim: true}, function (err, result) {

    if (err) {
      console.log('ERROR: ' + err);
      return;
    }

    serializeDotNotation(result);

    return res.status(200).json(result);

  });

  //}
};

function parseDotNotation(str, val, obj) {
  let currentObj = obj;
  const keys = str.split('.');
  let i;
  const l = Math.max(1, keys.length - 1);
  let key;

  for (i = 0; i < l; ++i) {
    key = keys[i];
    currentObj[key] = currentObj[key] || {};
    currentObj = currentObj[key];
  }

  currentObj[keys[i]] = val;
  delete obj[str];
}

function serializeDotNotation(obj, current) {
  let res = {};

  for (let prop in obj) {
    if (!obj.hasOwnProperty(prop)) {
      continue;
    }

    if (obj[prop] === undefined) {
      continue;
    }

    let value = obj[prop];
    //console.log('value', value)
    console.log('current', current)
    let newKey = (current ? current + "." + prop : prop);  // joined key with dot
    if (value && typeof value === "object") {
      serializeDotNotation(value, newKey);  // it's a nested object, so do it again
    } else {
      res[newKey] = value;  // it's not an object, so set the property
    }
  }

  return JSON.stringify(res);
}

function expandObject(obj) {
  for (let prop in obj) {
    if (!obj.hasOwnProperty(prop)) {
      continue;
    }

    if (obj[prop] === undefined) {
      continue;
    }

    if (prop.indexOf('.') !== -1) {
      parseDotNotation(prop, obj[prop], obj);
    }
  }
  return obj;
}

function json2vien(obj) {
  let vien = `<babeledit_project version="1.0">\n`;
  vien += `  <preset_collections/>\n`;
  vien += `  <framework>ngx-translate</framework>\n`;
  vien += `  <filename>shaka-i18n.babel</filename>\n`;
  vien += `  <folder_node>\n`;
  vien += `    <name></name>\n`;
  vien += `    <children>\n`;

  const expanded = expandObject(obj);

  vien += parser(expanded);

  vien += `    </children>\n`;
  vien += `  </folder_node>\n`;
  vien = setTranslateFiles(vien);
  vien = setEditorConfig(vien);
  vien = setDefaultLanguage(vien, 'fr');
  vien = setDocumentConfig(vien);
  vien += `</babeledit_project>`;

  return vien;
}

function translations(locales, step) {
  let result = tabulate(' <translations>\n', step);

  locales.map(locale => {
    result += tabulate(`    <translation>\n`, step);
    result += tabulate(`      <language>${locale}</language>\n`, step);
    result += tabulate(`    </translation>\n`, step);
  });
  result += tabulate(`  </translations>\n`, step);

  return result;
}

function tabulate(str, number) {
  let tab = '';
  for (let i = 0; i < number; i++) {
    tab += `  `;
  }
  return `${tab}${str}`;
}

function parser(obj) {
  step++;
  let result = '';

  for (let prop in obj) {

    if (!obj.hasOwnProperty(prop)) {
      continue;
    }
    if (obj[prop] === undefined) {
      continue;
    }


    if (typeof  obj[prop] === 'object') {
      result += tabulate(`<folder_node>\n`, step);
      result += tabulate(`  <name>${prop}</name>\n`, step);
      result += tabulate(`  <children>\n`, step);
      step++;
      result += parser(new Object(obj[prop]));
      step--;
      result += tabulate(`</children>\n`, step);
      step--;
      result += tabulate(`</folder_node>\n`, step);
    } else {
      result += tabulate(`<concept_node>\n`, step);
      result += tabulate(`  <name>${prop}</name>\n`, step);
      result += tabulate(`  <definition_loaded>false</definition_loaded>\n`, step);
      result += tabulate(`  <description></description>\n`, step);
      result += tabulate(`  <comment></comment>\n`, step);
      result += tabulate(`  <default_text></default_text>\n`, step);
      result += translations(locales, step);
      result += tabulate(`</concept_node>\n`, step);
    }

  }

  return result;
}

function setTranslateFiles(data) {
  data += `  <translation_files>\n`;
  data += `    <translation_file>\n`;
  data += `      <language>en-US</language>\n`;
  data += `      <file>shaka/src/assets/i18n/en.json</file>\n`;
  data += `    </translation_file>\n`;
  data += `    <translation_file>\n`;
  data += `      <language>fr-FR</language>\n`;
  data += `      <file>shaka/src/assets/i18n/fr.json</file>\n`;
  data += `    </translation_file>\n`;
  data += `  </translation_files>\n`;

  return data;
}

function setEditorConfig(data) {
  data += `  <editor_configuration>\n`;
  data += `    <copy_templates>\n`;
  data += `      <copy_template>{{'%1' | translate}}</copy_template>\n`;
  data += `      <copy_template>[translate]="'%1'"</copy_template>\n`;
  data += `      <copy_template>_('%1')</copy_template>\n`;
  data += `    </copy_templates>\n`;
  data += `  </editor_configuration>\n`;

  return data;
}

function setDocumentConfig(data) {
  data += `  <configuration>\n`;
  data += `    <indent>tab</indent>\n`;
  data += `    <format>json</format>\n`;
  data += `  </configuration>\n`;

  return data;
}

function setDefaultLanguage(data, lang) {
  data += `  <primary_language>${lang}</primary_language>\n`;
  return data;
}

function xml2json(xml, tab) {
  const X = {
    toObj: function (xml) {
      let o = {};
      if (xml.nodeType === 1) {   // element node ..
        if (xml.attributes.length)   // element with attributes  ..
          for (let i = 0; i < xml.attributes.length; i++)
            o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
        if (xml.firstChild) { // element has child nodes ..
          let textChild = 0, cdataChild = 0, hasElementChild = false;
          for (let n = xml.firstChild; n; n = n.nextSibling) {
            if (n.nodeType === 1) hasElementChild = true;
            else if (n.nodeType === 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) textChild++; // non-whitespace text
            else if (n.nodeType === 4) cdataChild++; // cdata section node
          }
          if (hasElementChild) {
            if (textChild < 2 && cdataChild < 2) { // structured element with evtl. a single text or/and cdata node ..
              X.removeWhite(xml);
              for (let n = xml.firstChild; n; n = n.nextSibling) {
                if (n.nodeType === 3)  // text node
                  o["#text"] = X.escape(n.nodeValue);
                else if (n.nodeType === 4)  // cdata node
                  o["#cdata"] = X.escape(n.nodeValue);
                else if (o[n.nodeName]) {  // multiple occurence of element ..
                  if (o[n.nodeName] instanceof Array)
                    o[n.nodeName][o[n.nodeName].length] = X.toObj(n);
                  else
                    o[n.nodeName] = [o[n.nodeName], X.toObj(n)];
                }
                else  // first occurence of element..
                  o[n.nodeName] = X.toObj(n);
              }
            }
            else { // mixed content
              if (!xml.attributes.length)
                o = X.escape(X.innerXml(xml));
              else
                o["#text"] = X.escape(X.innerXml(xml));
            }
          }
          else if (textChild) { // pure text
            if (!xml.attributes.length)
              o = X.escape(X.innerXml(xml));
            else
              o["#text"] = X.escape(X.innerXml(xml));
          }
          else if (cdataChild) { // cdata
            if (cdataChild > 1)
              o = X.escape(X.innerXml(xml));
            else
              for (let n = xml.firstChild; n; n = n.nextSibling)
                o["#cdata"] = X.escape(n.nodeValue);
          }
        }
        if (!xml.attributes.length && !xml.firstChild) o = null;
      }
      else if (xml.nodeType === 9) { // document.node
        o = X.toObj(xml.documentElement);
      }
      else
        alert("unhandled node type: " + xml.nodeType);
      return o;
    },
    toJson: function (o, name, ind) {
      let json = name ? ("\"" + name + "\"") : "";
      if (o instanceof Array) {
        for (let i = 0, n = o.length; i < n; i++)
          o[i] = X.toJson(o[i], "", ind + "\t");
        json += (name ? ":[" : "[") + (o.length > 1 ? ("\n" + ind + "\t" + o.join(",\n" + ind + "\t") + "\n" + ind) : o.join("")) + "]";
      }
      else if (o == null)
        json += (name && ":") + "null";
      else if (typeof(o) === "object") {
        let arr = [];
        for (let m in o)
          arr[arr.length] = X.toJson(o[m], m, ind + "\t");
        json += (name ? ":{" : "{") + (arr.length > 1 ? ("\n" + ind + "\t" + arr.join(",\n" + ind + "\t") + "\n" + ind) : arr.join("")) + "}";
      }
      else if (typeof(o) === "string")
        json += (name && ":") + "\"" + o.toString() + "\"";
      else
        json += (name && ":") + o.toString();
      return json;
    },
    innerXml: function (node) {
      let s = "";
      if ("innerHTML" in node)
        s = node.innerHTML;
      else {
        let asXml = function (n) {
          let s = "";
          if (n.nodeType === 1) {
            s += "<" + n.nodeName;
            for (let i = 0; i < n.attributes.length; i++)
              s += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
            if (n.firstChild) {
              s += ">";
              for (let c = n.firstChild; c; c = c.nextSibling)
                s += asXml(c);
              s += "</" + n.nodeName + ">";
            }
            else
              s += "/>";
          }
          else if (n.nodeType === 3)
            s += n.nodeValue;
          else if (n.nodeType === 4)
            s += "<![CDATA[" + n.nodeValue + "]]>";
          return s;
        };
        for (let c = node.firstChild; c; c = c.nextSibling)
          s += asXml(c);
      }
      return s;
    },
    escape: function (txt) {
      return txt.replace(/[\\]/g, "\\\\")
        .replace(/[\"]/g, '\\"')
        .replace(/[\n]/g, '\\n')
        .replace(/[\r]/g, '\\r');
    },
    removeWhite: function (e) {
      e.normalize();
      for (let n = e.firstChild; n;) {
        if (n.nodeType === 3) {  // text node
          if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) { // pure whitespace text node
            let nxt = n.nextSibling;
            e.removeChild(n);
            n = nxt;
          }
          else
            n = n.nextSibling;
        }
        else if (n.nodeType === 1) {  // element node
          X.removeWhite(n);
          n = n.nextSibling;
        }
        else                      // any other node
          n = n.nextSibling;
      }
      return e;
    }
  };
  if (xml.nodeType === 9) // document node
    xml = xml.documentElement;
  let json = X.toJson(X.toObj(X.removeWhite(xml)), xml.nodeName, "\t");
  let result = "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
  return res.status(200).json(result);
}
