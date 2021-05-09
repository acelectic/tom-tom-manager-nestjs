export const titleEn = {
  //Data
  "['Mr','Mr.','mr','mr.']": 'Mr',
  "['Ms','Ms.','ms','ms.']": 'Ms',
  "['Mrs','Mrs.,'mrs','mrs.']": 'Mrs',

  getKey: function(key) {
    return Object.keys(this).find(val => {
      return val
        .replace(/(\[|\]|'|")/g, '')
        .split(',')
        .includes(key)
    })
  },
  get: function(key) {
    return this[this.getKey(key)]
  },
}

export const titleTh = {
  //Data
  "['นาย']": 'นาย',
  "['นาง']": 'นาง',
  "['นางสาว','น.ส.']": 'นางสาว',

  getKey: function(key) {
    return Object.keys(this).find(val => {
      return val
        .replace(/(\[|\]|'|")/g, '')
        .split(',')
        .includes(key)
    })
  },
  get: function(key) {
    return this[this.getKey(key)]
  },
}
