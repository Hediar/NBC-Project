import '../styles/globals.css';
import type { Metadata } from 'next';
import ReactQueryProvider from '../static/ReactQueryProvider';
import Header from '@/components/Header/Header';
import ScrollToTopButton from '@/components/common/ScrollToTopButton';
import { ConfigProvider } from 'antd';
import { Analytics } from '@vercel/analytics/react';
import Footer from '@/components/common/Footer';
import { RouteChangesProvider } from '@/static/RouteChangeEventsProvider';

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
    },
    Message: {
      zIndexPopup: 1070
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
            <RouteChangesProvider>
              <Header />
              {props.children}
              <Footer />
            </RouteChangesProvider>
          </ConfigProvider>
        </ReactQueryProvider>
        <ScrollToTopButton />
        <Analytics />
      </body>
    </html>
  );
}
