# [무비바바] 영화평론사이트

무비바바는 자신이 본 영화를 기록하고, 영화에 대해 이야기도 나눠볼 수 있는 **영화 평론 커뮤니티**입니다.

사용자가 자신이 본 영화에 대해 **평점**을 매기면, **장르별 추천**을 통해서 좋아할만한 영화를 알아서 추천받을 수 있어요! <br />
뿐만 아니라 영화에 대해 토론을 할 수 있는 **토픽 글**을 작성할 수 있고, 그 외 영화 정보와 순위 등의 다양한 서비스를 제공합니다.

[🎬무비바바 방문하기](https://moviebaba.vercel.app/)

## ![2차 original size](https://github.com/Hediar/NBC-Project/assets/72387948/24144831-b4ef-4b3f-92a3-6c2f3a84a858)

## 👨‍🔧 서비스 아키텍쳐

<img src="https://github.com/Hediar/NBC-Project/assets/72387948/94a343ca-7152-46c0-93ba-67ed726a2aa7" width="700"/>

<details>
<summary>ERD</summary>
<div markdown="1">
<img src="https://github.com/Hediar/NBC-Project/assets/72387948/a83e6fc7-f521-404e-84d9-7cda619d1403" width="700"/>

</div>
</details>

<details>
<summary>폴더 구조</summary>
<div markdown="2">
📦src  
 ┣ 📂api  
 ┃ ┣ 📂generateUsername  
 ┃ ┃ ┣ 📜generateRandomUsername.ts  
 ┃ ┃ ┣ 📜generateUniqueRandomUsername.ts  
 ┃ ┃ ┗ 📜isUsernameAvailable.ts  
 ┃ ┣ 📂movieStatistics  
 ┃ ┃ ┣ 📜countMovieGenres.ts  
 ┃ ┃ ┣ 📜getGenresUserLikes.ts   
 ┃ ┃ ┣ 📜getLikesByGenres.ts  
 ┃ ┃ ┣ 📜getNumbersOfGenresWatched.ts  
 ┃ ┃ ┣ 📜getOrganizedMovieDetails.ts  
 ┃ ┃ ┣ 📜getRuntimesByGenres.ts  
 ┃ ┃ ┗ 📜getWatchedMoviesList.ts  
 ┃ ┣ 📂supabase  
 ┃ ┃ ┣ 📜getUserIsPublicData.ts  
 ┃ ┃ ┣ 📜saveUserProviderWithEmail.ts  
 ┃ ┃ ┗ 📜toggleIsPublicData.ts
 ┃ ┣ 📜discoverMoviesWithGenreId.ts
 ┃ ┣ 📜doesUserMatch.ts
 ┃ ┣ 📜formatTime.ts
 ┃ ┣ 📜getMovieDataWithMovieIds.ts
 ┃ ┣ 📜getMovieGenres.ts
 ┃ ┣ 📜getMovieNameWIthMovieId.ts
 ┃ ┣ 📜POSTWatchLater.ts
 ┃ ┣ 📜review.ts
 ┃ ┣ 📜supabase-discussion.ts
 ┃ ┗ 📜tmdb.ts
 ┣ 📂app
 ┃ ┣ 📂(auth)
 ┃ ┃ ┣ 📂(route-handler)
 ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┣ 📂callback
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┣ 📂delete-account
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┣ 📂get-userdata
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┃ ┃ ┣ 📂change-avatar
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂change-password
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂forgot-password
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂name
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂password
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂reauthenticate-user
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂username
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┣ 📂sign-in
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┣ 📂sign-out
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┗ 📂sign-up
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂oauth
 ┃ ┃ ┃ ┃ ┗ 📂(social-sign-in)
 ┃ ┃ ┃ ┃ ┃ ┣ 📂callback
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📂google-sign-in
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┗ 📂search-username
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂forgot-password
 ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜resetPassword.tsx
 ┃ ┃ ┃ ┣ 📜Message.tsx
 ┃ ┃ ┃ ┣ 📜SocialButtons.backup.tsx
 ┃ ┃ ┃ ┗ 📜SocialButtons.tsx
 ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┣ 📂Buttons
 ┃ ┃ ┃ ┃ ┣ 📜AlreadyWatchedButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜NotYetWatchedButton
 ┃ ┃ ┃ ┃ ┃ ┗ 📜NotYetWatchedButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜WatchLaterButton.tsx
 ┃ ┃ ┃ ┗ 📜__tests__
 ┃ ┃ ┃ ┃ ┣ 📜AlreadyWatchedButton.test.tsx
 ┃ ┃ ┃ ┃ ┣ 📜NotYetWatchedButton.test.tsx
 ┃ ┃ ┃ ┃ ┗ 📜WatchLaterButton.test.tsx
 ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┗ 📜SideBar.tsx
 ┃ ┃ ┣ 📂redux
 ┃ ┃ ┃ ┣ 📂actions
 ┃ ┃ ┃ ┃ ┗ 📂auth
 ┃ ┃ ┃ ┃ ┃ ┣ 📜actions.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜types.ts
 ┃ ┃ ┃ ┣ 📂reducers
 ┃ ┃ ┃ ┃ ┗ 📂auth
 ┃ ┃ ┃ ┃ ┃ ┣ 📜reducers.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜types.ts
 ┃ ┃ ┃ ┣ 📂slices
 ┃ ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┃ ┣ 📜authSlice.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┗ 📜store.ts
 ┃ ┃ ┣ 📂util
 ┃ ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┃ ┃ ┗ 📜i18n
 ┃ ┃ ┃ ┣ 📂i18n
 ┃ ┃ ┃ ┃ ┗ 📜en.ts
 ┃ ┃ ┃ ┗ 📂types
 ┃ ┃ ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┃ ┗ 📜i18n.ts
 ┃ ┃ ┣ 📂views
 ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┣ 📜auth.tsx
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜profile.tsx
 ┃ ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┃ ┗ 📜SideBar.tsx
 ┃ ┃ ┃ ┗ 📂(route-handler)
 ┃ ┃ ┃ ┃ ┗ 📂auth
 ┃ ┃ ┃ ┃ ┃ ┗ 📂sign-up
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂movie
 ┃ ┃ ┃ ┃ ┣ 📜discover.tsx
 ┃ ┃ ┃ ┃ ┣ 📜genre.tsx
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜result.tsx
 ┃ ┃ ┃ ┣ 📂not-found
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂settings
 ┃ ┃ ┃ ┃ ┣ 📂change-email
 ┃ ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂change-password
 ┃ ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂change-username
 ┃ ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂delete-account
 ┃ ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂index.ts
 ┃ ┃ ┃ ┃ ┗ 📂socials
 ┃ ┃ ┃ ┃ ┃ ┣ 📂add
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📂delete
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┣ 📂account
 ┃ ┃ ┃ ┃ ┃ ┣ 📂notifications
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜notifications.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜settings.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂activity
 ┃ ┃ ┃ ┃ ┃ ┣ 📂posts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜posts.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜single-post.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜thread.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┃ ┃ ┣ 📂comments
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜comments.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┣ 📂(store)
 ┃ ┃ ┃ ┗ 📂(auth)
 ┃ ┃ ┃ ┃ ┗ 📂(auth)
 ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂types
 ┃ ┃ ┃ ┣ 📜app.ts
 ┃ ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┃ ┣ 📜i18n.ts
 ┃ ┃ ┃ ┗ 📜redux.ts
 ┃ ┃ ┣ 📂util
 ┃ ┃ ┃ ┗ 📂common
 ┃ ┃ ┃ ┃ ┗ 📜auth.ts
 ┃ ┃ ┃ ┣ 📂i18n
 ┃ ┃ ┃ ┃ ┗ 📜en.ts
 ┃ ┃ ┃ ┣ 📂types
 ┃ ┃ ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┃ ┃ ┣ 📜i18n.ts
 ┃ ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┃ ┗ 📜redux.ts
 ┃ ┃ ┣ 📂views
 ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┣ 📜auth.tsx
 ┃ ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜profile.tsx
 ┃ ┃ ┃ ┣ 📂common
 ┃ ┃ ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┃ ┃ ┗ 📜SideBar.tsx
 ┃ ┃ ┃ ┗ 📂(route-handler)
 ┃ ┃ ┃ ┃ ┗ 📂auth
 ┃ ┃ ┃ ┃ ┃ ┗ 📂sign-up
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂movie
 ┃ ┃ ┃ ┃ ┣ 📜discover.tsx
 ┃ ┃ ┃ ┃ ┣ 📜genre.tsx
 ┃ ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📜result.tsx
 ┃ ┃ ┃ ┃ ┗ 📜search.tsx
 ┃ ┃ ┃ ┣ 📂not-found
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂settings
 ┃ ┃ ┃ ┃ ┣ 📂change-email
 ┃ ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂change-password
 ┃ ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂change-username
 ┃ ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂delete-account
 ┃ ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂index.ts
 ┃ ┃ ┃ ┃ ┗ 📂socials
 ┃ ┃ ┃ ┃ ┃ ┣ 📂add
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📂delete
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┣ 📂account
 ┃ ┃ ┃ ┃ ┃ ┣ 📂notifications
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜notifications.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜settings.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┣ 📂activity
 ┃ ┃ ┃ ┃ ┃ ┣ 📂posts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜posts.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜single-post.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜thread.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┃ ┃ ┣ 📂comments
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜comments.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┗ 📂types
 ┃ ┃ ┃ ┃ ┣ 📜app.ts
 ┃ ┃ ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┃ ┃ ┣ 📜i18n.ts
 ┃ ┃ ┃ ┃ ┗ 📜redux.ts
 ┃ ┃ ┗ 📜index.ts
 ┃ ┣ 📂public
 ┃ ┃ ┣ 📂static
 ┃ ┃ ┃ ┣ 📜main.css
 ┃ ┃ ┃ ┗ 📜main.js
 ┃ ┃ ┣ 📜favicon.ico
 ┃ ┃ ┣ 📜index.html
 ┃ ┃ ┗ 📜manifest.webmanifest
 ┃ ┣ 📜App.tsx
 ┃ ┗ 📜index.tsx
 ┣ 📂(models)
 ┃ ┣ 📂api
 ┃ ┃ ┣ 📂generateUsername
 ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┃ ┣ 📜generateRandomUsername.ts
 ┃ ┃ ┃ ┃ ┣ 📜generateUniqueRandomUsername.ts
 ┃ ┃ ┃ ┃ ┗ 📜isUsernameAvailable.ts
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂movieStatistics
 ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┃ ┣ 📜countMovieGenres.ts
 ┃ ┃ ┃ ┃ ┣ 📜getGenresUserLikes.ts
 ┃ ┃ ┃ ┃ ┣ 📜getLikesByGenres.ts
 ┃ ┃ ┃ ┃ ┣ 📜getNumbersOfGenresWatched.ts
 ┃ ┃ ┃ ┃ ┣ 📜getOrganizedMovieDetails.ts
 ┃ ┃ ┃ ┃ ┣ 📜getRuntimesByGenres.ts
 ┃ ┃ ┃ ┃ ┗ 📜getWatchedMoviesList.ts
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂supabase
 ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┃ ┣ 📜getUserIsPublicData.ts
 ┃ ┃ ┃ ┃ ┣ 📜saveUserProviderWithEmail.ts
 ┃ ┃ ┃ ┃ ┗ 📜toggleIsPublicData.ts
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┣ 📂discoverMoviesWithGenreId.ts
 ┃ ┃ ┣ 📂doesUserMatch.ts
 ┃ ┃ ┣ 📂formatTime.ts
 ┃ ┃ ┣ 📂getMovieDataWithMovieIds.ts
 ┃ ┃ ┣ 📂getMovieGenres.ts
 ┃ ┃ ┣ 📂getMovieNameWIthMovieId.ts
 ┃ ┃ ┣ 📂POSTWatchLater.ts
 ┃ ┃ ┣ 📂review.ts
 ┃ ┃ ┣ 📂supabase-discussion.ts
 ┃ ┃ ┗ 📂tmdb.ts
 ┃ ┗ 📜index.ts
 ┃ ┣ 📂app
 ┃ ┃ ┣ 📂(auth)
 ┃ ┃ ┃ ┣ 📂(route-handler)
 ┃ ┃ ┃ ┃ ┣ 📂auth
 ┃ ┃ ┃ ┃ ┃ ┗ 📂callback
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂delete-account
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂get-userdata
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂profile
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂change-avatar
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂change-password
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂forgot-password
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂name
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂password
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂reauthenticate-user
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂username
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┣ 📂sign-in
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┣ 📂sign-out
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┗ 📂sign-up
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂oauth
 ┃ ┃ ┃ ┃ ┗ 📂(social-sign-in)
 ┃ ┃ ┃ ┃ ┃ ┣ 📂callback
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📂google-sign-in
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┗ 📂search-username
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂forgot-password
 ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂index.ts
 ┃ ┃ ┃ ┣ 📂name
 ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂password
 ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂reauthenticate-user
 ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂username
 ┃ ┃ ┃ ┃ ┣ 📜form.tsx
 ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┣ 📂account
 ┃ ┃ ┃ ┃ ┣ 📂(route-handler)
 ┃ ┃ ┃ ┃ ┃ ┣ 📂notifications
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂index.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂notifications
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜settings.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜toggle.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜page.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜settings.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂posts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜posts.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜single-post.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜thread.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜vote.tsx
 ┃ ┃ ┃ ┃ ┃ ┣ 📂settings
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜change-email.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜change-password.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜change-username.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜delete-account.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📂user
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂comments
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜post.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜comments.tsx
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┗ 📂posts
 ┃ ┃ ┃ ┃ ┣ 📂(post)
 ┃ ┃ ┃ ┃ ┃ ┗ 📂comments
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜addComment.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜addReply.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜deleteComment.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜deleteReply.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜getComments.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜getReplies.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜getReply.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜updateComment.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜updateReply.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┣ 📂entity
 ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┃ ┣ 📂interfaces
 ┃ ┃ ┃ ┃ ┃ ┣ 📜createPost.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜deletePost.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜getPosts.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜getPostsByUserId.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜getPostsForHomepage.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜getSinglePost.ts
 ┃ ┃ ┃ ┃ ┃ ┣ 📜updatePost.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜userLikesPost.ts
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┗ 📂interfaces
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┗ 📂search
 ┃ ┃ ┃ ┣ 📂(search-username)
 ┃ ┃ ┃ ┃ ┣ 📂search
 ┃ ┃ ┃ ┃ ┃ ┗ 📂get-user
 ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┣ 📂search-genres
 ┃ ┃ ┃ ┃ ┣ 📂search-genre
 ┃ ┃ ┃ ┃ ┃ ┗ 📂genre
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂get-genre-details
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂search-genre
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📂index.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂get-genre
 ┃ ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜search.ts
 ┃ ┃ ┃ ┃ ┣ 📂search-genres
 ┃ ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┃ ┣ 📂search-movie
 ┃ ┃ ┃ ┃ ┃ ┗ 📂get-movie
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂index.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜search.ts
 ┃ ┃ ┃ ┃ ┣ 📂search-users
 ┃ ┃ ┃ ┃ ┃ ┗ 📂get-user
 ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📂index.ts
 ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┃ ┃ ┗ 📜search.ts
 ┃ ┃ ┃ ┃ ┣ 📂search.ts
 ┃ ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┃ ┃ ┗ 📂user-movie
 ┃ ┃ ┃ ┃ ┣ 📂index.ts
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┣ 📜index.ts
 ┃ ┃ ┗ 📂user-genres
 ┃ ┃ ┃ ┣ 📂genre
 ┃ ┃ ┃ ┃ ┣ 📂index.ts
 ┃ ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┃ ┃ ┗ 📜index.ts
 ┃ ┗ 📂models
 ┃ ┃ ┣ 📜api.ts
 ┃ ┃ ┣ 📜app.ts
 ┃ ┃ ┣ 📜auth.ts
 ┃ ┃ ┣ 📜i18n.ts
 ┃ ┃ ┗ 📜redux.ts
 ┣ 📂public
 ┃ ┣ 📂static
 ┃ ┃ ┣ 📜main.css
 ┃ ┃ ┗ 📜main.js
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜index.html
 ┃ ┗ 📜manifest.webmanifest
 ┣ 📜App.tsx
 ┗ 📜index.tsx

</div>
</details>

---

## 🔍주요 기능

### ✅ 메인화면

- 장르별 인기영화, 최신 리뷰, 최신 개봉 영화, 지금 핫한 토픽 확인 가능
- 영화 찜하기, 추천 무시하기, 영화 좋아요 기능
- 마이페이지에서 내가 찜한 영화 확인 가능

### ✅ 영화

- 영화 검색, 검색어를 입력하여 해당 영화를 찾아볼 수 있음
- 인기순·최신순·별점순 정렬

### ✅ 영화 토론

- 토론글 CRUD -투표토론, 자유토론, 댓글, 댓글 좋아요, 임시저장
- 토론글에 조회수, 투표수
- 마이페이지에서 내가 쓴 글 확인 가능
- 리뷰 검색 -최신순·조회순·투표순 정렬, 검색명을 입력하여 해당 토론글을 찾아볼 수 있음

### ✅ 영화 리뷰

- 리뷰글 CRUD -영화 선택, 별점, 키워드 리뷰 작성, 한줄평, 임시저장
- 리뷰글에 좋아요
- 마이페이지에서 내가 쓴 글 확인 가능
- 리뷰 검색 -최신순·좋아요순·별점순 정렬, 검색명을 입력하여 해당 리뷰 찾아볼 수 있음

### ✅ 로그인 및 마이페이지

- 이메일 로그인, 소셜 로그인
- 로그인 및 회원가입시 캡챠(보안)
- 내정보, 추천 + 찜 + 좋아요 + 나의 리뷰 목록, 설정
- 평점 및 내가 본 영화 기반으로 장르별 영화를 추천
- 닉네임, 프로필사진, 이메일, 비밀번호 변경
- 나의 목록 공개 여부 -찜, 좋아요, 나의 리뷰

---

## 🍀 주요 기술

- next.js
- typescript
- supabase
- tanstack query
- zustand
- vercel
- lodash
- tailwind

## 🧑🏻 팀원 소개

| 이름(역할)       | GITHUB                           | BLOG                            |
| ---------------- | -------------------------------- | ------------------------------- |
| 이세령(팀장)     | https://github.com/Hediar        | https://velog.io/@hediar        |
| 김환훈(부팀장)   | https://github.com/kimhwanhoon   | https://velog.io/@kimhwanhoon   |
| 서경모(팀원)     | https://github.com/CTDKSKM       | 주소입력                        |
| 이지영(팀원)     | https://github.com/lizzieFEstudy | https://console-log.tistory.com |
| 조아라(디자이너) | [이메일](이메일주소입력)         | 주소입력                        |
