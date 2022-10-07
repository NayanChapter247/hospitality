import Link from "next/link";
import React, { useState, useEffect } from "react";
import Footer from "../components/common-components/Footer";
import Header from "../components/common-components/Header";
import { userDataProvider } from "../components/helpers/ApiHelper";
function ThanksPage() {
  let [name, setName] = useState("");
  let userData = userDataProvider();
  useEffect(() => {
    if (userData !== null && userData !== undefined) {
      setName(userData.name);
    }
  }, [userData]);
  return (
    <div>
      {process.browser ? (
        <>
          <Header />
          <div className="px-5 sm:px-20 md:px-100 text-center">
            <p className="text-5xl text-center pt-10 text-gray-500">
              Hii, {name}!
            </p>
            <p className="text-2xl text-center pt-10 text-gray-500">
              Thanks for signing up to the Hospitality Finder,
              <br />
              your account is now ready to work!
            </p>
            <div className="grid justify-items-center pt-10">
              <img
                alt="Hire a personal Cook or Chef"
                src="/images/success.png"
                className="text-center w-48 h-48"
              />
            </div>
            <div className="px-5 sm:px-10 md:px-60 pt-5">
              <Link href="/" passHref>
                <button className="w-full rounded bg-[#259af2] text-[#ffffff] text-2xl h-16 mt-5 mb-20">
                  Visit Account
                </button>
              </Link>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default ThanksPage;
