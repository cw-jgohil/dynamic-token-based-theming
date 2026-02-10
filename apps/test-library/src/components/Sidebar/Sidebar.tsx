import { SidebarProps } from "./Sidebar.types";
import { useNavigation } from "./Sidebar.hooks";

const Sidebar = ({ menuItems }: SidebarProps) => {
  const { navigateTo, isActivePath } = useNavigation();

  return (
    <div className="d-flex flex-column bg-light border-end" style={{ width: "250px", minHeight: "100vh" }}>
      <div className="p-3 border-bottom">
        <h5 className="mb-0">Dynamic Theming</h5>
      </div>
      <nav className="flex-grow-1">
        <ul className="nav flex-column">
          {menuItems.map((item) => (
            <li className="nav-item" key={item.path}>
              <button
                className={`nav-link btn btn-link text-start w-100 ${
                  isActivePath(item.path) ? "active bg-primary text-white" : "text-dark"
                }`}
                onClick={() => navigateTo(item.path)}
              >
                {item.icon && <span className="me-2">{item.icon}</span>}
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
