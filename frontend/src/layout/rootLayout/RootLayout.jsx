import { Link, Outlet } from "react-router-dom";
import "./rootLayout.css";
import { assets } from "../../assets/assets";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/clerk-react";
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
// console.log("Clerk Publishable Key:", PUBLISHABLE_KEY);

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const RootLayout = () => {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/" >
      <div className="rootLayout">
        <header>
          <Link to="/" className="logo">
            <img src={assets.logo} alt="" />
            <span>SUG AI</span>
          </Link>
          <div className="user">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </ClerkProvider>
  );
};

export default RootLayout;
