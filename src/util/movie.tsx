// 수정 필요
// import {
//   SVGOTTSmallAppleTv,
//   SVGOTTSmallGooglePlay,
//   SVGOTTSmallNaver,
//   SVGOTTSmallNetFilx,
//   SVGOTTSmallWave
// } from '@/styles/icons/IconsETC';

// // OTT return
// export const findBestProvider = (providers: watchProviders[]) => {
//   let bestProvider = null;

//   for (const providerType of ['flatrate', 'buy', 'rent']) {
//     const providerArray = providers[providerType];
//     if (providerArray.length > 0) {
//       // 우선 순위에 따라 선택
//       for (const provider of providerArray) {
//         if (!bestProvider || provider.display_priority < bestProvider.display_priority) {
//           bestProvider = provider;
//         }
//       }
//     }
//   }

//   // provider_name에 따라 SVG 컴포넌트 반환
//   if (bestProvider) {
//     switch (bestProvider.provider_name) {
//       case 'Netflix':
//         return <SVGOTTSmallNetFilx />;
//       case 'Google Play Movies':
//         return <SVGOTTSmallGooglePlay />;
//       case 'Apple TV':
//         return <SVGOTTSmallAppleTv />;
//       case 'wavve':
//         return <SVGOTTSmallWave />;
//       case 'Naver Store':
//         return <SVGOTTSmallNaver />;
//       default:
//         return null; // 다른 제공자에 대한 처리 추가
//     }
//   }

//   return null;
// };
