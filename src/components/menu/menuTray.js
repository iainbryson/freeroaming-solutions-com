import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import style from "./menuTray.module.css";
import DisclosureButton from "./disclosureButton";

function MenuTray(props) {
  const { menuItems } = props;

  const [stowed, setStowed] = useState(false);
  const [location, setLocation] = useState(window?.scrollY ?? 0);

  useEffect(() => {
    let updater;

    const scrollHandler = document.addEventListener("scroll", () => {
      if (!stowed) setStowed(true);
      if (updater) clearTimeout(updater);
      updater = setTimeout(() => setLocation(window?.scrollY ?? 0), 100);
    });
    return () => {
      if (updater) clearTimeout(updater);
      document.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  let classExtras = [style.menuTray];
  classExtras.push(stowed ? style.stowed : style.entrance);

  const disclosureButtons = menuItems.map((item) => (
    <DisclosureButton
      key={item}
      text={item}
      stowed={stowed}
      location={location}
      link={item}
    ></DisclosureButton>
  ));

  return (
    <nav className={`flex flex-row inline-block p-1 ${classExtras.join(" ")}`}>
      {disclosureButtons}
    </nav>
  );
}

MenuTray.propTypes = {
  menuItems: PropTypes.array,
};

export default MenuTray;
