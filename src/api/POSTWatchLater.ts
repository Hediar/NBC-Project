const POSTWatchLater = async (movieId: number | string) => {
  const formData = new FormData();
  formData.append('movieId', String(movieId));
  const data = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/watch-later`, {
    method: 'post',
    body: formData
  });
  const { message } = await data.json();

  if (message.includes('삭제')) {
    if (message.includes('실패')) return '을/를 찜하기 목록에서 제외하는데 실패했습니다. 다시 시도해주세요.';
    if (message.includes('성공')) return '을/를 찜하기 목록에서 제외했습니다.';
  } else {
    if (message.includes('추가')) {
      if (message.includes('실패')) return '을/를 찜하기 목록에 추가하는데 실패했습니다. 다시 시도해주세요.';
      if (message.includes('성공')) return '을/를 찜하기 목록에 추가했습니다.';
    }
  }
};
export default POSTWatchLater;
