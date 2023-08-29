const generateRandomUsername = async (): Promise<string> => {
  const data = await fetch('https://nickname.hwanmoo.kr/?format=json&count=1&max_length=15');
  const { words: randomUsernameArray } = await data.json();
  return randomUsernameArray[0] as string;
};

export default generateRandomUsername;
