import RootLayout from "./layout";
import CreateAccount from "@/pages/createAccount";

export default function Home() {
  return (
    <RootLayout>
      <div>
        <CreateAccount />
      </div>
    </RootLayout>
  );
}
