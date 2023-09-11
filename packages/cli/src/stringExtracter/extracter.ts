import _ from 'lodash'

export interface ExtracterOptions {
  startExtract?: string
  endExtract?: string
  initValue?: any
  extractors?: Extracter
}

export interface Extracter {
  [key:string]: string | number;
}

const defaults = {
  startExtract: '{',
  endExtract: '}',
  extractors: {},
}


function escapseRegExp(str:string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function overrideProperties(dest:ExtracterOptions, src:ExtracterOptions) {
  dest.startExtract = src.startExtract && src.startExtract.length ? src.startExtract :
    defaults.startExtract;
  dest.endExtract = src.endExtract && src.endExtract.length ? src.endExtract : defaults
    .endExtract;
  dest.initValue = src.initValue;
  dest.extractors = src.extractors ? src.extractors : defaults.extractors;
}

function clone<T>(o:T) {
  return _.cloneDeep(o);
}


export function extract(template:string, input:string, settings = defaults) {

  if (typeof template !== 'string') throw 'Expected string template, Found ' + (typeof template);
  var result:{
    [key:string]: any;
  } = {};
  var properties = {};
  var keys:string[] = [],
    match, idx, pattern:RegExp | string = '',
    loc = 0;

  overrideProperties(properties, settings);

  var extractorPattern = new RegExp(escapseRegExp((properties as ExtracterOptions).startExtract) + '(.*?)' +
    escapseRegExp((properties as ExtracterOptions).endExtract), 'g');

  template.replace(extractorPattern, function(match, token:string, offset:number, str:string) {
    token = token.trim();
    if (token !== '') {
      result[token] = (properties as ExtracterOptions).initValue as string;
      keys.push(token);
    }
    pattern += escapseRegExp(str.substring(loc, offset));
    loc = offset + match.length;

    if (token === '') return '';
    pattern += '([\\s\\S]*?)';
    if (offset + match.length !== str.length) return '';
    pattern += '$';
    return '';
  });

  if (loc < template.length) {
    pattern += escapseRegExp(template.substring(loc));
  }

  if (typeof input !== 'string') {
    return {
      'extract': matcher,
      'bind': interpolate,
      'interpolate': interpolate
    };
  }

  function defaultExtractor(input:string):number | string {
    return +input && parseInt(input) ? +input : input;
  }

  function extractor(output:ExtracterOptions, token:string, value:string):number | string {
    var fun = output.extractors[token] || defaultExtractor;
    if(typeof fun !== 'function')
      return value;
    return fun(value);
  }

  function interpolate(o:string[]):string {
    var token, output = template,
      pattern;
    var endExtract = escapseRegExp((properties as ExtracterOptions).endExtract);
    var startExtract = escapseRegExp((properties as ExtracterOptions).startExtract);
    for (token in o) {
      if (result.hasOwnProperty(token)) {
        pattern = new RegExp(startExtract + '\\s*' + escapseRegExp(token) + '\\s*' +
          endExtract, 'g');
        output = output.replace(pattern, o[token]);
      }
    }
    for (token in result) {
      pattern = new RegExp(startExtract + escapseRegExp(token) + endExtract, 'g');
      output = output.replace(pattern, (properties as ExtracterOptions).initValue);
    }
    return output;
  }

  function matcher(input:string) {
    var output:ExtracterOptions['extractors'] = clone(result);
    if (typeof input !== 'string') return output;
    match = input.match(pattern);
    if (match) {
      match.shift();
      for (idx in keys) {
        output[keys[idx]] = extractor(properties, keys[idx], match[idx]);
      }
    }
    return output;
  }

  pattern = new RegExp(pattern);
  return matcher(input);
};