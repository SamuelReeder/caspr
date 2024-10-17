import CreateAccount from "./createAccount";
import ForgotPassword from "./forgotPassword";
import UploadFile from "./uploadFile";
import { useRouter } from "next/router";

export default function CatchAllRoute() {
	const router = useRouter();
	const { slug } = router.query;

	if (slug && slug[0] === "create-account") {
		return <CreateAccount />;
	}

	if (slug && slug[0] === "upload-file") {
		return <UploadFile />;
	}

	if (slug && slug[0] === "forgot-password") {
		return <ForgotPassword />;
	}

	// TODO - display a 404 error page
	return <div>Page not found</div>;
}
