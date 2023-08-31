import axios from 'axios';

export const POST = async (req: Request) => {
  const { data } = await axios('https://nickname.hwanmoo.kr/?format=json&count=1&max_length=15');

  return new Response(data.words[0], {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
};
