export function assign(obj: any, prop: string | string[], value: any) {

  if (prop === null || prop === undefined) {
    throw new Error('Propertie name undefined');
  }

  if (typeof prop === 'string') {
    prop = prop.split('.');
  }

  if (prop.length > 1) {
    const e = prop.shift();
    assign(obj[e!] =
      Object.prototype.toString.call(obj[e!]) === '[object Object]'
        ? obj[e!]
        : {},
      prop,
      value);
  } else {
    obj[prop[0]] = value;
  }
}
