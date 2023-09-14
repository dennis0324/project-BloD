import _ from 'lodash'

type Extracter = Record<string, number | string | ExtracterOverried>

type ExtracterOverried = (str:string) => string | number

type NewLineSperator = NewLineSperatorMultiple | NewLineSperatorSingle

type NewLineSperatorSingle = {
  start:string
  align:'end' | 'start'
}

type NewLineSperatorMultiple = {
  start:string
  end:string
  align:'center' | 'end' | 'start'
}

// type Align = 'center' | 'end' | 'start'

export interface ExtracterOptions<T> {
  startExtract: string
  endExtract: string
  initValue: any
  extractors: T
  newLineSperator:NewLineSperator
}


// interface Extracter {
//   [key:string]: string | number | Function;
// }

const defaults = {
  startExtract: '{',
  endExtract: '}',
  extractors: {},
  initValue: ''
}


function escapseRegExp(str:string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function overrideProperties(dest:Partial<ExtracterOptions<Extracter>>, src:Partial<ExtracterOptions<Extracter>>) {
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


export class Extract {
  private result:Partial<Extracter> = {};
  private properties:Partial<ExtracterOptions<Extracter>> = {};
  // 사용자가 설정한 추줄 키 값
  private keys:string[] = []
  private pattern:RegExp | string = ''

  constructor(private template:string, settings = defaults) {

    if (typeof template !== 'string') throw 'Expected string template, Found ' + (typeof template);
    overrideProperties(this.properties, settings);
  
    const extractorPattern = new RegExp(escapseRegExp(this.properties.startExtract) + '(.*?)' +
      escapseRegExp(this.properties.endExtract), 'g');

    let loc = 0;
    this.template.replace(extractorPattern, (match, token:string, offset:number, str:string) => {
      token = token.trim();

      if (token !== '') {
        this.result[token] = this.properties.initValue as string;
        this.keys.push(token);
      }

      this.pattern += escapseRegExp(str.substring(loc, offset));
      loc = offset + match.length;
      if (token === '') return '';
      this.pattern += '([\\s\\S]*?)';
      if (offset + match.length !== str.length) return '';
      this.pattern += '$';
      return '';
    });
  
    if (loc < template.length) {
      this.pattern += escapseRegExp(template.substring(loc));
    }
  }

  private defaultExtractor(input:string):number | string {
    return +input && parseInt(input) ? +input : input;
  }

  private extractor(output:Partial<ExtracterOptions<Extracter>>, token:string, value:string):number | string {
    var fun = output.extractors[token] || this.defaultExtractor;
    if(typeof fun !== 'function')
      return value;
    return fun(value);
  }

  private matcher(input:string):Extracter{
    let output:ExtracterOptions<Extracter>['extractors'] = clone(this.result);

    if (typeof input !== 'string') return output;

    const match = input.match(this.pattern);
    if (match) {
      match.shift();
      for (let idx in this.keys) {
        output[this.keys[idx]] = this.extractor(this.properties, this.keys[idx], match[idx]);
      }
    }
    return output;
  }

  interpolate(o:{
    [key in keyof Extracter]?: Extracter[key]
  }):string {
    var token, output = this.template,
      pattern;
    var endExtract = escapseRegExp(this.properties.endExtract);
    var startExtract = escapseRegExp(this.properties.startExtract);
    for (token in o) {
      if (this.result.hasOwnProperty(token)) {
        pattern = new RegExp(startExtract + '\\s*' + escapseRegExp(token) + '\\s*' +
          endExtract, 'g');
        output = output.replace(pattern, o[token] as string);
      }
    }
    for (token in this.result) {
      pattern = new RegExp(startExtract + escapseRegExp(token) + endExtract, 'g');
      output = output.replace(pattern, this.properties.initValue);
    }
    return output;
  }
  putWordInRegexp(word:string){
    return '(' + word + ')';
  }

  extract(input:string,options?:Partial<ExtracterOptions<Extracter>>){
    let rightStr = ''
    let replacedStr = ''

    const align = options?.newLineSperator.align ?? ''
    if((options.newLineSperator as NewLineSperatorMultiple).end){
      rightStr = (options.newLineSperator as NewLineSperatorMultiple).end
    }
    let regExpString = new RegExp(this.putWordInRegexp(options.newLineSperator.start) 
    +this.putWordInRegexp(rightStr), 'g');


    if(align === 'center'){
      replacedStr = '$1-:-$2'
    }
    else if(align === 'end'){
      replacedStr = '$1$2-:-'
    }
    else if(align === 'start'){
      replacedStr = '-:-$1$2'
    }

    const textsStr = input.replace(regExpString,replacedStr)
    const texts = textsStr.split('-:-').filter(e => e !== '')
    return texts.map(text => this.matcher(text))
  }


};