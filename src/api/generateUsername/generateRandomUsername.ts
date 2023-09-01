import axios from 'axios';

const generateRandomUsername = async (): Promise<string> => {
  try {
    const { data } = await axios.get('https://nickname.hwanmoo.kr/?format=json&count=1&max_length=15');

    return data.words[0];
  } catch (error) {
    console.log(error);
    return 'error';
  }
};

export default generateRandomUsername;
