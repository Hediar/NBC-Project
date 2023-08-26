import '../styles/globals.css';
import type { Metadata } from 'next';
import ReactQueryProvider from './ReactQueryProvider';
import Header from '@/components/Header/Header';

export const metadata: Metadata = {
  title: '무비바바 | 영화추천, 영화만담의 페이지',
  description: '무비바바에 오신것을 환영합니다!'
};

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <ReactQueryProvider>
          <Header />
          {props.children}
        </ReactQueryProvider>
      </body>
    </html>
  );
}
