
import SideBarMenu from '../../Common/sidebar';
const menuItems = [
  { href: "/", label: "Books", icon: "/icon/open-book.svg" },
  { href: "/search-book", label: "Search Book", icon: "/icon/search.svg" },
  { href: "/how-it-work", label: "How It Works", icon: "/icon/howtowork.svg" },
  { href: "/create-book", label: "Create Book", icon: "/icon/createbook.svg" },
  { href: "/contact-us", label: "Contact Us", icon: "/icon/contact-us.svg" },
  { href: "/myorder", label: "My Orders", icon: "/icon/order.svg" },
  { href: "/profile", label: "Profile", icon: "/icon/user.svg" },
];
const SideBar = () => {
  return (
    <div>
        <SideBarMenu
      menuItems={menuItems}
      logo="d"
      contactLink="/contact-us"
    />
    </div>
  )
}

export default SideBar