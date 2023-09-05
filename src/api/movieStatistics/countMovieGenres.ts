// param:
// re
/**
 *
 * @param => ['액션', '애니메이션', '액션']
 * @returns => {액션: 2, 애니메이션: 1}
 */
const countMovieGenres = (arr: string[]) => {
  const count = {} as Record<string, number>;

  for (const genre of arr) {
    if (count[genre]) {
      count[genre] += 1;
    } else {
      count[genre] = 1;
    }
  }

  return count;
};

export default countMovieGenres;
