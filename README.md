# [무비바바] 영화평론사이트

무비바바는 자신이 본 영화를 기록하고, 영화에 대해 이야기도 나눠볼 수 있는 **영화 평론 커뮤니티**입니다.

사용자가 자신이 본 영화에 대해 **평점**을 매기면, **장르별 추천**을 통해서 좋아할만한 영화를 알아서 추천받을 수 있어요! <br />
뿐만 아니라 영화에 대해 토론을 할 수 있는 **토픽 글**을 작성할 수 있고, 그 외 영화 정보와 순위 등의 다양한 서비스를 제공합니다.

[🎬무비바바 방문하기](https://moviebaba.vercel.app/)

## ![2차 original size](https://github.com/Hediar/NBC-Project/assets/72387948/24144831-b4ef-4b3f-92a3-6c2f3a84a858)

## 👨‍🔧 서비스 아키텍쳐

<img src="https://github.com/Hediar/NBC-Project/assets/117324859/661467cb-235f-4c09-9d20-a0a76f0a7361" width="700"/>

> 📦src
> ┣ 📂api
> ┃ ┣ 📂generateUsername
> ┃ ┃ ┣ 📜generateRandomUsername.ts
> ┃ ┃ ┣ 📜generateUniqueRandomUsername.ts
> ┃ ┃ ┗ 📜isUsernameAvailable.ts
> ┃ ┣ 📂movieStatistics
> ┃ ┃ ┣ 📜countMovieGenres.ts
> ┃ ┃ ┣ 📜getGenresUserLikes.ts
> ┃ ┃ ┣ 📜getLikesByGenres.ts
> ┃ ┃ ┣ 📜getNumbersOfGenresWatched.ts
> ┃ ┃ ┣ 📜getOrganizedMovieDetails.ts
> ┃ ┃ ┣ 📜getRuntimesByGenres.ts
> ┃ ┃ ┗ 📜getWatchedMoviesList.ts
> ┃ ┣ 📂supabase
> ┃ ┃ ┣ 📜getUserIsPublicData.ts
> ┃ ┃ ┣ 📜saveUserProviderWithEmail.ts
> ┃ ┃ ┗ 📜toggleIsPublicData.ts
> ┃ ┣ 📜discoverMoviesWithGenreId.ts
> ┃ ┣ 📜doesUserMatch.ts
> ┃ ┣ 📜formatTime.ts
> ┃ ┣ 📜getMovieDataWithMovieIds.ts
> ┃ ┣ 📜getMovieGenres.ts
> ┃ ┣ 📜getMovieNameWIthMovieId.ts
> ┃ ┣ 📜POSTWatchLater.ts
> ┃ ┣ 📜review.ts
> ┃ ┣ 📜supabase-discussion.ts
> ┃ ┗ 📜tmdb.ts
> ┣ 📂app
> ┃ ┣ 📂(auth)
> ┃ ┃ ┣ 📂(route-handler)
> ┃ ┃ ┃ ┣ 📂auth
> ┃ ┃ ┃ ┃ ┣ 📂callback
> ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┃ ┣ 📂delete-account
> ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┃ ┣ 📂get-userdata
> ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┃ ┣ 📂profile
> ┃ ┃ ┃ ┃ ┃ ┣ 📂change-avatar
> ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┃ ┃ ┣ 📂change-password
> ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┃ ┃ ┣ 📂forgot-password
> ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┃ ┃ ┣ 📂name
> ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┃ ┃ ┣ 📂password
> ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┃ ┃ ┣ 📂reauthenticate-user
> ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┃ ┃ ┣ 📂username
> ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┃ ┣ 📂sign-in
> ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┃ ┣ 📂sign-out
> ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┃ ┗ 📂sign-up
> ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┣ 📂oauth
> ┃ ┃ ┃ ┃ ┗ 📂(social-sign-in)
> ┃ ┃ ┃ ┃ ┃ ┣ 📂callback
> ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┃ ┃ ┗ 📂google-sign-in
> ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┗ 📂search-username
> ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┗ 📂forgot-password
> ┃ ┃ ┃ ┣ 📜form.tsx
> ┃ ┃ ┃ ┣ 📜page.tsx
> ┃ ┃ ┃ ┗ 📜resetPassword.tsx
> ┃ ┣ 📂(color-extract)
> ┃ ┃ ┗ 📂api
> ┃ ┃ ┃ ┗ 📂imagecolorpicker
> ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┣ 📂(discussion-view-route-handler)
> ┃ ┃ ┗ 📂api
> ┃ ┃ ┃ ┗ 📂discussion
> ┃ ┃ ┃ ┃ ┗ 📂view
> ┃ ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┣ 📂(movies-route-handler)
> ┃ ┃ ┗ 📂movies
> ┃ ┃ ┃ ┣ 📂ignore-movie
> ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┣ 📂rate-movie
> ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┃ ┃ ┗ 📂watch-later
> ┃ ┃ ┃ ┃ ┗ 📜route.ts
> ┃ ┣ 📂(user-page)
> ┃ ┃ ┗ 📂user-page
> ┃ ┃ ┃ ┣ 📂[username]
> ┃ ┃ ┃ ┃ ┣ 📂info
> ┃ ┃ ┃ ┃ ┃ ┣ 📜not-found.tsx
> ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┃ ┃ ┣ 📂likes
> ┃ ┃ ┃ ┃ ┃ ┣ 📂private
> ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
> ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┃ ┃ ┣ 📂recommendations
> ┃ ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
> ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┃ ┃ ┣ 📂reviews
> ┃ ┃ ┃ ┃ ┃ ┣ 📜client.tsx
> ┃ ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
> ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┃ ┃ ┣ 📂settings
> ┃ ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
> ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┃ ┃ ┣ 📂watch-later
> ┃ ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
> ┃ ┃ ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
> ┃ ┃ ┃ ┃ ┗ 📜not-found.tsx
> ┃ ┃ ┃ ┗ 📜not-found.tsx
> ┃ ┣ 📂chat
> ┃ ┃ ┗ 📂[genreid]
> ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┣ 📂detail
> ┃ ┃ ┗ 📂[movieId]
> ┃ ┃ ┃ ┣ 📂crew
> ┃ ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┃ ┣ 📂discussion
> ┃ ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┃ ┣ 📂trailer
> ┃ ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┃ ┣ 📜layout.tsx
> ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┣ 📂discussion
> ┃ ┃ ┣ 📂detail
> ┃ ┃ ┃ ┗ 📂[discussionId]
> ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
> ┃ ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┣ 📂edit
> ┃ ┃ ┃ ┗ 📂[discussionId]
> ┃ ┃ ┃ ┃ ┣ 📜layout.tsx
> ┃ ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┣ 📂list
> ┃ ┃ ┃ ┣ 📜layout.tsx
> ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┗ 📂regist
> ┃ ┃ ┃ ┣ 📜layout.tsx
> ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┣ 📂movielist
> ┃ ┃ ┗ 📜page.tsx
> ┃ ┣ 📂review
> ┃ ┃ ┣ 📂edit
> ┃ ┃ ┃ ┗ 📂[postId]
> ┃ ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┣ 📂write
> ┃ ┃ ┃ ┣ 📂[movieId]
> ┃ ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┣ 📂[postId]
> ┃ ┃ ┃ ┣ 📜loading.tsx
> ┃ ┃ ┃ ┗ 📜page.tsx
> ┃ ┃ ┣ 📜layout.tsx
> ┃ ┃ ┗ 📜page.tsx
> ┃ ┣ 📂[genreId]
> ┃ ┃ ┗ 📜page.tsx
> ┃ ┣ 📜icon.tsx
> ┃ ┣ 📜layout.tsx
> ┃ ┣ 📜loading.tsx
> ┃ ┣ 📜not-found.tsx
> ┃ ┣ 📜page.tsx
> ┃ ┣ 📜ReactQueryProvider.tsx
> ┃ ┗ 📜RouteChangeEventsProvider.tsx
> ┣ 📂components
> ┃ ┣ 📂Auth
> ┃ ┃ ┣ 📂ForgotPassword
> ┃ ┃ ┃ ┗ 📜ForgotPasswordModal.tsx
> ┃ ┃ ┣ 📂SignIn
> ┃ ┃ ┃ ┗ 📜SignIn.tsx
> ┃ ┃ ┣ 📂SignUp
> ┃ ┃ ┃ ┣ 📜NewSignUp.tsx
> ┃ ┃ ┃ ┗ 📜SignUp.tsx
> ┃ ┃ ┣ 📜Message.tsx
> ┃ ┃ ┣ 📜SocialButtons.backup.tsx
> ┃ ┃ ┗ 📜SocialButtons.tsx
> ┃ ┣ 📂common
> ┃ ┃ ┣ 📂Buttons
> ┃ ┃ ┃ ┣ 📜AlreadyWatchedButton.tsx
> ┃ ┃ ┃ ┣ 📜MovieButtons.tsx
> ┃ ┃ ┃ ┣ 📜MovieLikes.tsx
> ┃ ┃ ┃ ┗ 📜WatchLaterButton.tsx
> ┃ ┃ ┣ 📂skeleton
> ┃ ┃ ┃ ┗ 📜MovieItem.tsx
> ┃ ┃ ┣ 📂Slider
> ┃ ┃ ┃ ┣ 📜ArrowsDotsButtons.tsx
> ┃ ┃ ┃ ┣ 📜EmblaCarousel.tsx
> ┃ ┃ ┃ ┗ 📜Slider.tsx
> ┃ ┃ ┣ 📜AddIgnoreMovieButton.tsx
> ┃ ┃ ┣ 📜DisplayMovies.tsx
> ┃ ┃ ┣ 📜DisplayMoviesInfiniteScroll.tsx
> ┃ ┃ ┣ 📜DragDrop.tsx
> ┃ ┃ ┣ 📜Footer.tsx
> ┃ ┃ ┣ 📜LeaveCheck.tsx
> ┃ ┃ ┣ 📜LeaveConfirmModal.tsx
> ┃ ┃ ┣ 📜LoadingSpinner.tsx
> ┃ ┃ ┣ 📜Modal.tsx
> ┃ ┃ ┣ 📜MovieItem.tsx
> ┃ ┃ ┣ 📜NewLoading.tsx
> ┃ ┃ ┣ 📜OverlaidModal.tsx
> ┃ ┃ ┣ 📜Paging.tsx
> ┃ ┃ ┣ 📜RateMovie.tsx
> ┃ ┃ ┣ 📜ScrollToTopButton.tsx
> ┃ ┃ ┣ 📜Search.tsx
> ┃ ┃ ┣ 📜Select.tsx
> ┃ ┃ ┗ 📜Sorting.tsx
> ┃ ┣ 📂contents
> ┃ ┃ ┣ 📜MovieDataList.tsx
> ┃ ┃ ┣ 📜MovieList.tsx
> ┃ ┃ ┣ 📜MovieListSkeleton.tsx
> ┃ ┃ ┗ 📜Sort.tsx
> ┃ ┣ 📂Discussion
> ┃ ┃ ┣ 📂detail
> ┃ ┃ ┃ ┣ 📂comment
> ┃ ┃ ┃ ┃ ┣ 📜CommentInput.tsx
> ┃ ┃ ┃ ┃ ┣ 📜DeleteComment.tsx
> ┃ ┃ ┃ ┃ ┣ 📜DiscussionCommentContainer.tsx
> ┃ ┃ ┃ ┃ ┣ 📜DiscussionCommentContainerSuspense.tsx
> ┃ ┃ ┃ ┃ ┣ 📜DisplayComments.tsx
> ┃ ┃ ┃ ┃ ┣ 📜EditComment.tsx
> ┃ ┃ ┃ ┃ ┣ 📜EditCommentInput.tsx
> ┃ ┃ ┃ ┃ ┗ 📜LikeButton.tsx
> ┃ ┃ ┃ ┣ 📂related-discussion
> ┃ ┃ ┃ ┃ ┣ 📜RelatedDiscussionList.tsx
> ┃ ┃ ┃ ┃ ┣ 📜RelatedDiscussionListSuspense.tsx
> ┃ ┃ ┃ ┃ ┗ 📜RelatedDiscussionPost.tsx
> ┃ ┃ ┃ ┣ 📜DiscussionContent.tsx
> ┃ ┃ ┃ ┣ 📜DiscussionDetail.tsx
> ┃ ┃ ┃ ┣ 📜DiscussionDetailSuspense.tsx
> ┃ ┃ ┃ ┣ 📜DiscussionTopic.tsx
> ┃ ┃ ┃ ┣ 📜DiscussionTopicSuspense.tsx
> ┃ ┃ ┃ ┣ 📜EditDeleteBox.tsx
> ┃ ┃ ┃ ┣ 📜Option.tsx
> ┃ ┃ ┃ ┣ 📜OptionVote.tsx
> ┃ ┃ ┃ ┗ 📜ViewCount.tsx
> ┃ ┃ ┗ 📂list
> ┃ ┃ ┃ ┣ 📜DiscussionFilteringBox.tsx
> ┃ ┃ ┃ ┣ 📜DiscussionList.tsx
> ┃ ┃ ┃ ┣ 📜DiscussionListSuspense.tsx
> ┃ ┃ ┃ ┣ 📜DiscussionPost.tsx
> ┃ ┃ ┃ ┗ 📜DiscussionRegistBtn.tsx
> ┃ ┣ 📂Header
> ┃ ┃ ┣ 📂_auth
> ┃ ┃ ┃ ┣ 📜AuthButtons.tsx
> ┃ ┃ ┃ ┣ 📜ModalControlCentre.tsx
> ┃ ┃ ┃ ┣ 📜SaveUserInfoToStore.tsx
> ┃ ┃ ┃ ┣ 📜SignInButton.tsx
> ┃ ┃ ┃ ┣ 📜SignOutButton.tsx
> ┃ ┃ ┃ ┗ 📜SignUpButton.tsx
> ┃ ┃ ┣ 📜Header.tsx
> ┃ ┃ ┣ 📜HeaderMenuButton.tsx
> ┃ ┃ ┣ 📜HeaderUser.tsx
> ┃ ┃ ┗ 📜Nav.tsx
> ┃ ┣ 📂MainPage
> ┃ ┃ ┣ 📂MainContents
> ┃ ┃ ┃ ┣ 📜HotTopics.tsx
> ┃ ┃ ┃ ┣ 📜LatestMovies.tsx
> ┃ ┃ ┃ ┣ 📜LatestReviews.tsx
> ┃ ┃ ┃ ┗ 📜MainSkeleton.tsx
> ┃ ┃ ┣ 📂MainPageMovies
> ┃ ┃ ┃ ┣ 📜KeywordButtons.tsx
> ┃ ┃ ┃ ┣ 📜LatestMovieSlider.tsx
> ┃ ┃ ┃ ┣ 📜TrendMoives.tsx
> ┃ ┃ ┃ ┗ 📜TrendMovieSlider.tsx
> ┃ ┃ ┣ 📜MainPage.tsx
> ┃ ┃ ┗ 📜MainPageSkeleton.tsx
> ┃ ┣ 📂MovieDetail
> ┃ ┃ ┣ 📂appearance-production
> ┃ ┃ ┃ ┗ 📜AppearanceProduction.tsx
> ┃ ┃ ┣ 📂discussion
> ┃ ┃ ┃ ┗ 📜Discussion.tsx
> ┃ ┃ ┣ 📂main
> ┃ ┃ ┃ ┣ 📜KeyInfomation.tsx
> ┃ ┃ ┃ ┣ 📜KeyInfomationSuspense.tsx
> ┃ ┃ ┃ ┗ 📜PreviewAppearance.tsx
> ┃ ┃ ┣ 📂trailer-photo
> ┃ ┃ ┃ ┣ 📜MovieDetailTrailer.tsx
> ┃ ┃ ┃ ┣ 📜MovieDetailTrailerSuspense.tsx
> ┃ ┃ ┃ ┣ 📜TrailerPlay.tsx
> ┃ ┃ ┃ ┗ 📜TrailerSlider.tsx
> ┃ ┃ ┣ 📜MovieDetailBottomBar.tsx
> ┃ ┃ ┣ 📜MovieDetailInfo.tsx
> ┃ ┃ ┣ 📜MovieLayoutDiscussion.tsx
> ┃ ┃ ┗ 📜MovieProviders.tsx
> ┃ ┣ 📂Review
> ┃ ┃ ┣ 📂list
> ┃ ┃ ┃ ┣ 📜PosterBaseColor.tsx
> ┃ ┃ ┃ ┣ 📜ReviewFetchMore.tsx
> ┃ ┃ ┃ ┣ 📜ReviewFetchMoreSuspense.tsx
> ┃ ┃ ┃ ┣ 📜ReviewFilteringBox.tsx
> ┃ ┃ ┃ ┣ 📜ReviewItem.tsx
> ┃ ┃ ┃ ┗ 📜WriteButton.tsx
> ┃ ┃ ┗ 📜ReviewLikes.tsx
> ┃ ┣ 📂ReviewForm
> ┃ ┃ ┣ 📜CategoryBox.tsx
> ┃ ┃ ┣ 📜HashTagBox.tsx
> ┃ ┃ ┣ 📜MyMovies.tsx
> ┃ ┃ ┣ 📜MyMoviesSwiper.tsx
> ┃ ┃ ┣ 📜ReviewForm.tsx
> ┃ ┃ ┣ 📜ReviewMovie.tsx
> ┃ ┃ ┣ 📜ReviewWriteTemplate.tsx
> ┃ ┃ ┣ 📜SearchMovies.tsx
> ┃ ┃ ┣ 📜SearchMoviesItem.tsx
> ┃ ┃ ┣ 📜SearchPopup.tsx
> ┃ ┃ ┣ 📜StarBox.tsx
> ┃ ┃ ┗ 📜UtilButtons.tsx
> ┃ ┣ 📂ReviewList
> ┃ ┃ ┣ 📜MyReviewListLoading.tsx
> ┃ ┃ ┣ 📜ReviewItem.tsx
> ┃ ┃ ┗ 📜ReviewListEmpty.tsx
> ┃ ┗ 📂UserPage
> ┃ ┃ ┣ 📂RecommendationList
> ┃ ┃ ┃ ┗ 📜_RecommendationList.tsx
> ┃ ┃ ┣ 📂settings
> ┃ ┃ ┃ ┣ 📂ChangeInfo
> ┃ ┃ ┃ ┃ ┣ 📜ChangeEmail.tsx
> ┃ ┃ ┃ ┃ ┣ 📜ChangeInfo.tsx
> ┃ ┃ ┃ ┃ ┗ 📜ChangePassword.tsx
> ┃ ┃ ┃ ┣ 📂MyAccount
> ┃ ┃ ┃ ┃ ┣ 📜ChangeAvatarPhoto.tsx
> ┃ ┃ ┃ ┃ ┣ 📜ChangeUsername.tsx
> ┃ ┃ ┃ ┃ ┣ 📜ChooseProfile.tsx
> ┃ ┃ ┃ ┃ ┣ 📜IconContainer.tsx
> ┃ ┃ ┃ ┃ ┗ 📜MyAccount.tsx
> ┃ ┃ ┃ ┣ 📂MyMenu
> ┃ ┃ ┃ ┃ ┣ 📜MyMenu.tsx
> ┃ ┃ ┃ ┃ ┗ 📜ToggleIsPublic.tsx
> ┃ ┃ ┃ ┣ 📂Profile
> ┃ ┃ ┃ ┃ ┣ 📜AvatarPhoto.tsx
> ┃ ┃ ┃ ┃ ┣ 📜DeleteUser.tsx
> ┃ ┃ ┃ ┃ ┣ 📜Miscellaneous.tsx
> ┃ ┃ ┃ ┃ ┣ 📜MyAccount.tsx
> ┃ ┃ ┃ ┃ ┣ 📜UpdateEmail.tsx
> ┃ ┃ ┃ ┃ ┣ 📜UpdateName.tsx
> ┃ ┃ ┃ ┃ ┣ 📜UpdatePassword.tsx
> ┃ ┃ ┃ ┃ ┗ 📜UpdateUsername.tsx
> ┃ ┃ ┃ ┣ 📜UserSettingsProfile.tsx
> ┃ ┃ ┃ ┗ 📜UserSettingsTabs.tsx
> ┃ ┃ ┣ 📂UserInfo
> ┃ ┃ ┃ ┣ 📂PersonalRecords
> ┃ ┃ ┃ ┃ ┣ 📂BigElements(Graphs)
> ┃ ┃ ┃ ┃ ┃ ┣ 📂Graphs
> ┃ ┃ ┃ ┃ ┃ ┃ ┣ 📜MovieRuntimeGraph.tsx
> ┃ ┃ ┃ ┃ ┃ ┃ ┗ 📜NumberOfGenresGraph.tsx
> ┃ ┃ ┃ ┃ ┃ ┣ 📜LikesOnGenres.tsx
> ┃ ┃ ┃ ┃ ┃ ┣ 📜NumberOfGenresWatched.tsx
> ┃ ┃ ┃ ┃ ┃ ┗ 📜RuntimeByGenres.tsx
> ┃ ┃ ┃ ┃ ┣ 📂SmallElements
> ┃ ┃ ┃ ┃ ┃ ┣ 📜NumberOfMoviesWatched.tsx
> ┃ ┃ ┃ ┃ ┃ ┣ 📜NumberOfReviews.tsx
> ┃ ┃ ┃ ┃ ┃ ┗ 📜TotalWatchingTime.tsx
> ┃ ┃ ┃ ┃ ┣ 📂_Containers
> ┃ ┃ ┃ ┃ ┃ ┣ 📜RecordsContainerBig.tsx
> ┃ ┃ ┃ ┃ ┃ ┗ 📜RecordsContainerSmall.tsx
> ┃ ┃ ┃ ┃ ┣ 📜PersonalRecords.tsx
> ┃ ┃ ┃ ┃ ┗ 📜PersonalRecordsGraph.tsx
> ┃ ┃ ┃ ┣ 📜MostWatchedGenres.tsx
> ┃ ┃ ┃ ┗ 📜SemiHeader.tsx
> ┃ ┃ ┣ 📜HiddenUserPageTabs.tsx
> ┃ ┃ ┗ 📜UserPageTabs.tsx
> ┣ 📂hooks
> ┃ ┣ 📜filterIgnoreMovies.ts
> ┃ ┣ 📜saveCurrentURL.ts
> ┃ ┣ 📜saveSignedInUserData.ts
> ┃ ┣ 📜useCheckbox.ts
> ┃ ┣ 📜useDiscussionOptionQuery.ts
> ┃ ┣ 📜useDiscussionPostQuery.ts
> ┃ ┣ 📜useLeaveConfiramation.tsx
> ┃ ┣ 📜useMiddlewareRouter.ts
> ┃ ┣ 📜useMovieLikesMutation.ts
> ┃ ┗ 📜useReviewLikesMutation.ts
> ┣ 📂static
> ┃ ┣ 📜baseImgUrl.ts
> ┃ ┣ 📜movieCountries.ts
> ┃ ┣ 📜movieGenres.ts
> ┃ ┣ 📜optionMark.ts
> ┃ ┣ 📜quickReviews.ts
> ┃ ┗ 📜review.ts
> ┣ 📂store
> ┃ ┣ 📜forgotPasswordToggle.ts
> ┃ ┣ 📜isProfileSelected.ts
> ┃ ┣ 📜originPathnameStore.ts
> ┃ ┣ 📜saveCurrentUserData.ts
> ┃ ┣ 📜toggleChangeAvatarModal.ts
> ┃ ┣ 📜toggleDiscussionCommentEditModal.ts
> ┃ ┣ 📜toggleSignInModal.ts
> ┃ ┣ 📜toggleSignUpModal.ts
> ┃ ┣ 📜useDiscussionStore.ts
> ┃ ┗ 📜useReviewStore.ts
> ┣ 📂styles
> ┃ ┣ 📂icons
> ┃ ┃ ┣ 📜Icons16.tsx
> ┃ ┃ ┣ 📜Icons24.tsx
> ┃ ┃ ┣ 📜Icons32.tsx
> ┃ ┃ ┗ 📜IconsETC.tsx
> ┃ ┣ 📂svg
> ┃ ┃ ┣ 📂avatar
> ┃ ┃ ┃ ┣ 📜Icon1.tsx
> ┃ ┃ ┃ ┣ 📜Icon2.tsx
> ┃ ┃ ┃ ┣ 📜Icon3.tsx
> ┃ ┃ ┃ ┣ 📜Icon4.tsx
> ┃ ┃ ┃ ┗ 📜Icon5.tsx
> ┃ ┃ ┣ 📜CheckMark.tsx
> ┃ ┃ ┣ 📜Dot.tsx
> ┃ ┃ ┣ 📜Edit.tsx
> ┃ ┃ ┣ 📜Ellipse.tsx
> ┃ ┃ ┣ 📜GitHubFooter.tsx
> ┃ ┃ ┣ 📜Google.tsx
> ┃ ┃ ┣ 📜Google_SVG.tsx
> ┃ ┃ ┣ 📜Kakao.tsx
> ┃ ┃ ┣ 📜Kakao_SVG.tsx
> ┃ ┃ ┣ 📜LoadingFriends.tsx
> ┃ ┃ ┣ 📜Logo.tsx
> ┃ ┃ ┣ 📜LogoIcon.tsx
> ┃ ┃ ┣ 📜LogoWhite.tsx
> ┃ ┃ ┣ 📜NoContent.tsx
> ┃ ┃ ┣ 📜Prohibit.tsx
> ┃ ┃ ┣ 📜settings.tsx
> ┃ ┃ ┣ 📜SignOut.tsx
> ┃ ┃ ┣ 📜SVG_HidePassword.tsx
> ┃ ┃ ┗ 📜SVG_ShowPassword.tsx
> ┃ ┣ 📜globals.css
> ┃ ┗ 📜paging.css
> ┣ 📂supabase
> ┃ ┗ 📜config.ts
> ┣ 📂types
> ┃ ┣ 📜supabase.ts
> ┃ ┗ 📜types.d.ts
> ┣ 📂util
> ┃ ┣ 📂supabase
> ┃ ┃ ┣ 📂auth
> ┃ ┃ ┃ ┣ 📜auth.ts
> ┃ ┃ ┃ ┗ 📜public.ts
> ┃ ┃ ┗ 📂userPage
> ┃ ┃ ┃ ┗ 📜doesUserExist.ts
> ┃ ┣ 📜findColors.ts
> ┃ ┣ 📜isServer.ts
> ┃ ┣ 📜movie.tsx
> ┃ ┗ 📜tripArrayToLength.ts
> ┗ 📜middleware.ts

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
