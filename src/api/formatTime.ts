// 2023-08-29T07:05:53.192337Z 같은 형식을
// 2023 -08 - 29 16:05으로 변환

const changeFormat = (time: string) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hour = String(date.getHours()).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  const formattedString = `${year}-${month}-${day} ${hour}:${minute}`;
  return formattedString;
};

export default changeFormat;
