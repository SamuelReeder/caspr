import CreateAccount from './createAccount';
import { useRouter } from 'next/router';

export default function CatchAllRoute() {
  const router = useRouter();
  const { slug } = router.query;

  if (slug && slug[0] === 'create-account') {
    return <CreateAccount />;
  }

  // TODO - display a 404 error page
  return <div>Page not found</div>; 
}