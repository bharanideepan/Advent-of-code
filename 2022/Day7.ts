const fs = require('fs');
const data = fs.readFileSync('Day7input.txt', 'utf8');
const input = data.toString().split('\n')

const isCommand = (s) => {
  return s.charAt(0) === '$'
}

const getCommandName = (s) => {
  return s.charAt(2) + s.charAt(3)
}

const getCdPath = (s) => {
  const arr = [...s];
  return arr.slice(5, arr.length).join('');
}

const directories = {
  '/': {}
}

const directories2 = {
  '/': { totalSize: 0, size: 0 }
}

let currentDirectory = ''
const currentDirectoryList = [];

const result = {}

const setCurrentDirectory = (path) => {
  if (path === '..') {
    currentDirectoryList.pop();
  } else {
    currentDirectoryList.push(path);
  }
  currentDirectory = currentDirectoryList[currentDirectoryList.length - 1]
}

for (let index = 0; index < input.length; index++) {
  const element = input[index];
  if (isCommand(element)) {
    const commandName = getCommandName(element);
    if (commandName === 'cd') {
      const path = getCdPath(element);
      setCurrentDirectory(path);
    } else if (commandName === 'ls') {

      let localIndex = index + 1;
      let nextElement = input[localIndex]
      while (nextElement && !isCommand(nextElement)) {
        const [a, b] = nextElement.split(' ')
        let currentObj = directories;
        let currentObj2 = directories2;

        currentDirectoryList.forEach((dir, index) => {
          if (index === currentDirectoryList.length - 1) {
            if (a === 'dir') {
              currentObj[dir][b] = {}
              currentObj2[dir][b] = { size: 0 }
            } else {
              currentObj[dir][b] = {
                type: 'file', name: b, size: a
              }
              const x = currentObj2[dir].size + Number(a)
              currentObj2[dir].size = x
            }
          } else {
            currentObj = currentObj[dir]
            currentObj2 = currentObj2[dir]
          }
        })
        nextElement = input[++localIndex]
      }
      index = localIndex - 1
    }
  }
}

const iterate = (obj) => {
  const keys = Object.keys(obj)
  let size = obj.size;
  keys.forEach(key => {
    const value = obj[key];
    if (typeof value === 'object' && value !== null) {
      size += iterate(value);
    }
  })
  obj.totalSize = size;
  return size
}

let result1 = 0
const iterate2 = (obj) => {
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (key === 'totalSize' && !isNaN(value)) {
      if (value <= 100000) {
        result1 += value
      } else return
    }
    if (typeof value === 'object' && value !== null) {
      iterate2(value)
    }
  })
}

iterate(directories2['/'])
Object.keys(directories2['/']).forEach((key) => {
  const obj = directories2['/'][key];
  if (typeof obj === 'object') {
    directories2['/'].size += obj.totalSize;
  }
})
iterate2(directories2['/'])
console.log('part1 => ', result1)

const total = directories2['/'].totalSize
const remaining = 70000000 - total;
const need = 30000000 - remaining;
const temp = [];
const iterate3 = (obj) => {
  Object.keys(obj).forEach(key => {
    const value = obj[key];
    if (need - obj.totalSize <= 0 && !temp.includes(obj.totalSize))
      temp.push(obj.totalSize);
    if (typeof value === 'object' && value !== null) {
      iterate3(value)
    }
  })
}
iterate3(directories2['/'])

const result2 = temp.sort((a, b) => a - b)[0]

console.log('part2 => ', result2)
