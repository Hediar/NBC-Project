const trimArrayToLength = (arr: Array<string | number>, maxLength: number) => {
  if (arr.length > maxLength) {
    while (arr.length > maxLength) {
      arr.pop(); // 배열의 마지막 요소를 제거
    }
  }
};

export default trimArrayToLength;
