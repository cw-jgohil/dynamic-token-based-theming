import "./ComponentSidebar.css";
import { useComponents } from "../api/components";
import { useAppDispatch } from "../redux/store";
import { setSelectedComponents } from "../redux/slices/componentSlice";

const ComponentSidebar = () => {
  const { data, isLoading, error } = useComponents();
  const dispatch = useAppDispatch();

  return (
    <div className="component-sidebar">
      <div className="sidebar-header">
        <h5 className="mb-0">Component List</h5>
      </div>
      <div className="sidebar-content">
        {isLoading && <div className="text-center">Loading...</div>}
        {!isLoading && data?.length && data?.length > 0 && (
          <ul className="list-group">
            {data?.map((component) => {
              return (
                <li
                  className="list-group-item cursor-pointer"
                  key={component.id}
                  onClick={() => dispatch(setSelectedComponents(component))}
                >
                  {component.name}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ComponentSidebar;
