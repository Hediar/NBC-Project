const POSTWatchLater = async (movieId: number | string) => {
  const formData = new FormData();
  formData.append('movieId', String(movieId));
  await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/movies/watch-later`, {
    method: 'post',
    body: formData
  });
  return;
};
export default POSTWatchLater;
