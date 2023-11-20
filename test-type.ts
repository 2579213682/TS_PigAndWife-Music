// 定义函数的调用签名
interface IFnCall<IRoot> {
  <Twhy>(fn: (num:IRoot) => Twhy, age: number): Twhy;
}

// 定义函数对象
const foo: IFnCall<number> = function (fn, age) {
  return fn(111);
};

// 调用函数
foo<string>(() => {
  return "aaaa";
}, 18);

// 不传入明确的调用时的泛型，类型推断
const res = foo(() => {
  return "aaaa";
}, 18);
