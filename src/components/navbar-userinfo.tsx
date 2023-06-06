import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

export const Navbaruserinfo = () => {
  const [user] = useAuthState(auth);

  const logUserOut = async () => {
    await signOut(auth);
  };

  return (
    <ul className="navbar-nav mt-2">
      {user && (
        <>
          <li className="nav-item">
            <p className="nav-link active">{user?.displayName}</p>
          </li>
          <li className="nav-item">
            <img
              className="nav-link active"
              src={user?.photoURL || ""}
              alt="User profile"
              height={20}
              width={20}
            />
          </li>
          <li className="nav-item active mt-1">
            <button
              onClick={logUserOut}
              className="nav-item btn btn-sm btn-outline-secondary"
            >
              Log Out
            </button>
          </li>
        </>
      )}
    </ul>
  );
};
