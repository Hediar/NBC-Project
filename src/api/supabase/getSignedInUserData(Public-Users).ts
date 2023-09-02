// supabase public에 users 테이블 얻기
// supabase는 cache가 안 되기 때문에 따로 빼서 fetch로 불러와 cache에 저장하기

const getSignedInUserData_Public_Users = async (id: string) => {
  const response = await fetch(`${process.env.BASE_URL}/auth/profile/request-signed-in-public-users`, {
    body: JSON.stringify({ id }),
    method: 'POST'
  });

  const data = await response.json();

  return data;
};

export default getSignedInUserData_Public_Users;
