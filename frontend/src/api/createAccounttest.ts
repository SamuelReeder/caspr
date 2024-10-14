import { createAccountWithEmail } from "./auth"; // Adjust the path as necessary
import { User } from "@/types";

(async () => {
  try {
    // Testing the function
    const email = "test@example.com";
    const password = "password123";

    // Use `await` to handle the Promise returned by the async function
    const result: User = await createAccountWithEmail(email, password);

    console.log("Account created successfully:", result);
  } catch (error) {
    console.error("Error creating account:", (error as Error).message);
  }
})();
