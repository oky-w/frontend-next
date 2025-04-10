import React from "react";

const Footer = () => {
  return (
    <footer className="footer footer-bottom fixed bottom-0 left-0 right-0 flex justify-center items-center w-full p-4">
      <aside>
        <p>Copyright {new Date().getFullYear()} - All right reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;
