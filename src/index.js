module.exports = function check(str, bracketsConfig) {
  const strArr = str.split('');
  const lastBracket = strArr[strArr.length - 1]; // последняя скобка

  let open = []; // массив открытых скобок
  let close = []; // массив закрытых скобок

  let sumA = 0; // счетчик количества скобок '(', ')'
  let sumB = 0; // счетчик количества пар скобок '()' || '[]' || '{}'

  let state = true; // если sumA === 0 и встретиться закрывающая скобка (sumA станет -1) 
  let res;

  bracketsConfig.forEach((v) => {
    open.push(v[0]);
    close.push(v[1]);
  });

  strArr.forEach((v, i, a) => {
    open.forEach((valOpen) => {
      if (v === valOpen) {
        sumA++;
      }
    });

    close.forEach((valClose) => {
      if (v === valClose) {
        sumA--;
      }
    });

    for (let k = 0; k < open.length; k++) {
      if (a[i] === open[k] && a[i + 1] === close[k]) {
        sumB++;
      }
    }

    if (sumA < 0) {
      state = false;
    }
  });

  for (let i = 0; i < close.length; i++) {
    if (state && !sumA && sumB && lastBracket === close[i]) {
      res = true;
    } else if (state && !sumA && sumB && lastBracket === '|') {
      res = true;
    } else {
      res = false;
    }

    return res;
  }
}
