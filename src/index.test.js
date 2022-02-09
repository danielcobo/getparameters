const getParameters = require('./index.js');

test('No parameter', function () {
  const func = function () {};
  expect(getParameters(func)).toStrictEqual([]);
});

test('Default parameter value', function () {
  const func = function (a = 4 * (5 / 3), b) {};
  expect(getParameters(func)).toStrictEqual(['a=4*(5/3)', 'b']);
});

test('Comments', function () {
  function func(/*aaa*/ b = 1 * 2 /*aaa*/) {
    return 1;
  }
  expect(getParameters(func)).toStrictEqual(['b=1*2']);
});

test('Comments with )', function () {
  const func = function (a /* fooled you)*/, b) {};
  expect(getParameters(func)).toStrictEqual(['a', 'b']);
});

test('Comments with {', function () {
  const func = function (a /* fooled you{*/, b) {};
  expect(getParameters(func)).toStrictEqual(['a', 'b']);
});

test('Single line comments', function () {
  const func = function (
    a,
    b //,c {
  ) {};
  expect(getParameters(func)).toStrictEqual(['a', 'b']);
});

test('Arrow function - no parameter', function () {
  const func = () => 1;
  expect(getParameters(func)).toStrictEqual([]);
});

test('Arrow function - single parameter', function () {
  const func = (a) => a + 1;
  expect(getParameters(func)).toStrictEqual(['a']);
});

test('Arrow function - multiple parameter', function () {
  const func = (a, b) => a + b;
  expect(getParameters(func)).toStrictEqual(['a', 'b']);
});
