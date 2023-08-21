export const getKOBISData = async () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_KOBIS_ACCESS_KEY}`
    }
  };
  const res = await fetch(`${process.env.NEXT_PUBLIC_KOBIS_BASE_URL}?key=${process.env.NEXT_PUBLIC_KOBIS_ACCESS_KEY}&`);
};

export const getRealTicketList = async () => {
  const res = await fetch(`https://www.kobis.or.kr/kobis/business/stat/boxs/findRealTicketList.do`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${process.env.NEXT_PUBLIC_KOBIS_ACCESS_KEY}` }
  });
  const html = await res.text();
  console.log('테스트=>');
  const parser = new DOMParser();
  console.log('테스트2');
  const doc = parser.parseFromString(html, 'text/html');
  const ticketList = doc.querySelector('#tr_');

  console.log('예매크롤링=>', ticketList);
};
