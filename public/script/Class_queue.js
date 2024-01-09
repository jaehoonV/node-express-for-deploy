export default class Queue {
    constructor() {
      this._arr = [];
    }
    enqueue(item) {
      this._arr.push(item);
    }
    dequeue() {
      return this._arr.shift();
    }
    max() {
      return Math.max(...this._arr);
    }
    min() {
      return Math.min(...this._arr);
    }
    standardDeviation() { /* 표준편차 fuction */
      const mean = this._arr.reduce((acc, val) => acc + val, 0) / this._arr.length;

      // 각 요소에서 평균을 뺀 값을 제곱한 값들의 평균 계산
      const squaredDifferences = this._arr.map(val => Math.pow(val - mean, 2));
      const meanOfSquaredDifferences = squaredDifferences.reduce(
        (acc, val) => acc + val,
        0
      ) / squaredDifferences.length;

      // 제곱한 값들의 평균의 제곱근 계산
      const standardDeviation = Math.sqrt(meanOfSquaredDifferences);

      return standardDeviation;
    }
  }