import { useEffect, useState } from "react";

import CreateAccount from "./createAccount";
import ForgotPassword from "./forgotPassword";
import FullScreenLoader from "./fullScreenLoader";
import UploadFile from "./uploadFile";
import { useRouter } from "next/router";

export default function CatchAllRoute() {
	const router = useRouter();
	const { slug } = router.query;
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoading(false);
		}, 300);

		return () => clearTimeout(timer);
	}, [slug]);

	if (loading) {
		return <FullScreenLoader />;
	}

	if (slug && slug[0] === "create-account") {
		return <CreateAccount />;
	}

	if (slug && slug[0] === "upload-file") {
		return <UploadFile />;
	}

	if (slug && slug[0] === "forgot-password") {
		return <ForgotPassword />;
	}

	return <div>Page not found</div>;
}
