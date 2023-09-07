import '../styles/globals.css';
import type { Metadata } from 'next';
import ReactQueryProvider from './ReactQueryProvider';
import Header from '@/components/Header/Header';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import Footer from '@/components/common/Footer';
import { ConfigProvider } from 'antd';

// 현재 DYNAMIC_SERVER_USAGE에러로 인하여 빌드할 때 실패하는 상황이라서 일단
// export const dynamic = 'force-dynamic';를 RootLayout에 선언하여
// 문제를 해결했습니다. 추후 제대로 문제해결이 필수로 필요합니다.
export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  title: '무비바바 | 영화추천, 영화만담의 페이지',
  description: '무비바바에 오신것을 환영합니다!'
};

const theme = {
  components: {
    Menu: {
      /* here is your component tokens */
      itemSelectedColor: '#222222',
      horizontalItemSelectedColor: '#222222'
    }
  },
  token: {
    colorPrimary: '#444'
  }
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ReactQueryProvider>
          <ConfigProvider theme={theme}>
            <Header />
            {props.children}
            {/* <Footer /> */}
          </ConfigProvider>
        </ReactQueryProvider>
        <ScrollToTopButton />
      </body>
    </html>
  );
}
