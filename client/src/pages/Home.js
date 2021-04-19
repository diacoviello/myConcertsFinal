import React from "react";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";
import HomeSearch from "../components/HomeSearch";

function Home() {
    return (
      <div>
        <MainNav />
        <HomeSearch />
        <Footer />
      </div>
    );
}

export default Home;
