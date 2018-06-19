function calc (expr) {
  const operators = {
    '+': (x, y) => x + y,
    '-': (x, y) => x - y,
    '*': (x, y) => x * y,
    '/': (x, y) => x / y,
    '%': (x, y) => x % y,
    '//':(x, y) => x/y>>0,
    '^': (x, y) => x**y
  };

  let stack = [];
  
  expr.split(' ').forEach((token) => {
      if (token in operators) {
          let [y, x] = [stack.pop(), stack.pop()];
          stack.push(operators[token](x, y));
      } else {
          stack.push(parseFloat(token));
      }
  });
  return stack.pop();
}

function convert (str) {
  let stack = [], res = [];

  let prior = {
    '^' : 4,'*' : 3,'/' : 3,'//': 3,'%' : 3, '+' : 2,'-' : 2,'(' : 1,')' : 1
  };

  str = str.replace(/\(/g, '( ')
           .replace(/\)/g, ' )')
           .replace(/-/g, '- ');
 
  str.split(' ').forEach(token => {
    if (!isNaN(token)) {
      res.push(token);
    } 

    else if (token ==='(') {
      stack.push(token);
    }   

    else if (token === ')') {
      while (stack[stack.length - 1]!=='(') {
        res.push(stack[stack.length - 1]);
        stack.pop();
      }
      stack.pop();
    }

    else if (prior[token] <= prior[stack[stack.length - 1]] ) {
      res.push(stack[stack.length - 1]);
      stack.pop();
      stack.push(token);

      if (prior[stack[stack.length - 1]] <= prior[stack[stack.length-2]] ) {
        res.push(stack[stack.length - 2]);
        stack[stack.length - 2] = stack[stack.length - 1];
        stack.pop();
      }
    } 
    else    
        stack.push(token);
  });

  while (stack.length!==0) {
      res.push(stack[stack.length - 1]);
      stack.pop();
  }

  return res.join(' ').replace('  ', ' ');
}

module.exports.calc = calc;
module.exports.convert = convert;