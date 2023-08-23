import { usePathname } from 'next/navigation';

const useSaveCurrentURL = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const pathname = usePathname();
  const currentURL = baseUrl + pathname;
  return currentURL;
};

export default useSaveCurrentURL;
