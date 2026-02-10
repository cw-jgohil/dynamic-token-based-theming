import React from "react";

const ActionMenu = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="position-relative">
      <button className="btn p-0" onClick={() => setOpen(!open)}>
        ⋮
      </button>

      {open && (
        <ul className="dropdown-menu show position-absolute start-0">
          <li>
            <button className="dropdown-item">Edit</button>
          </li>
          <li>
            <button className="dropdown-item text-danger">Delete</button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ActionMenu;
