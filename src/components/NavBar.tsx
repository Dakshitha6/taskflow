"use client";
import { useAuth } from "@/context/AuthContext";
import withAuth from "@/hoc/withAuth";
import { useEffect, useState } from "react";
import { FiMenu } from "react-icons/fi";
import { usePathname, useRouter } from "next/navigation";
import AvatarSelectionModal from "./AvatarComponent";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const storedAvatarUrl = localStorage.getItem("avatarUrl");
    if (storedAvatarUrl) {
      setAvatarUrl(storedAvatarUrl);
    }
  }, []);

  const handleAvatarSelect = (avatarUrl: string) => {
    localStorage.setItem("avatarUrl", avatarUrl);
    setAvatarUrl(avatarUrl);
    setIsModalOpen(false);
  };

  const isLoginPage = pathname === "/login";
  const isSignupPage = pathname === "/signup";

  return (
    <>
      <nav className="bg-gray-800 py-4 px-[16px] md:px-[32px] lg:px-[48px] fixed top-0 left-0 w-full z-50 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/images/logo.svg" alt="Logo" className="h-[36px] w-[36px] mr-2" />
            <span className="text-white text-lg font-semibold">TaskFlow</span>
          </div>

          <div className="hidden md:flex space-x-8 items-center">
            {user ? (
              pathname !== "/login" && pathname !== "/signup" ? (
                <>
                  <button
                    onClick={logout}
                    className="text-white bg-red-600 px-4 py-2 rounded-md"
                  >
                    Logout
                  </button>
                  <img
                    src={
                      avatarUrl ||
                      "/images/default-avatar1.png"
                    }
                    alt="User Avatar"
                    className="h-[36px] w-[36px] rounded-full object-cover ml-4 cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                  />
                </>
              ) : null
            ) : (
              <>
                <button
                  className={`px-4 py-2 rounded-md ${
                    isLoginPage ? "bg-blue-700 text-white" : " text-white"
                  }`}
                  onClick={() => router.push("/login")}
                >
                  Login
                </button>
                <button
                  className={`px-4 py-2 rounded-md ${
                    isSignupPage ? "bg-blue-700 text-white" : " text-white"
                  }`}
                  onClick={() => router.push("/signup")}
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          <div className="md:hidden flex items-center">
            {user && (
              <img
                src={avatarUrl || "/images/default-avatar1.png"}
                alt="User Avatar"
                className="h-8 w-8 rounded-full object-cover mr-4 cursor-pointer"
                onClick={() => setIsModalOpen(true)}
              />
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <FiMenu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-2 mt-2">
              {user ? (
                pathname !== "/login" && pathname !== "/signup" ? (
                  <>
                    <button
                      onClick={logout}
                      className="text-white bg-red-600 px-4 py-2 rounded-md"
                    >
                      Logout
                    </button>
                    
                  </>
                ) : null
              ) : (
                <>
                  {isLoginPage || isSignupPage ? null : (
                    <>
                      <button
                        className={`px-4 py-2 rounded-md ${
                          isLoginPage
                            ? "bg-blue-700 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                        onClick={() => router.push("/login")}
                      >
                        Login
                      </button>
                      <button
                        className={`px-4 py-2 rounded-md ${
                          isSignupPage
                            ? "bg-blue-700 text-white"
                            : "bg-blue-500 text-white"
                        }`}
                        onClick={() => router.push("/signup")}
                      >
                        Sign Up
                      </button>
                    </>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </nav>

      <AvatarSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSelectAvatar={handleAvatarSelect}
      />
    </>
  );
}

export default withAuth(Navbar);
