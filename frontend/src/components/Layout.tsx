import {
  OrganizationSwitcher,
  Show,
  useOrganization,
  UserButton,
} from "@clerk/react";
import { Link, Outlet } from "react-router-dom";
function Layout() {
  const { organization } = useOrganization();
  return (
    <div className={"layout"}>
      <div className={"nav"}>
        <div className={"nav-container"}>
          <Link to={"/"} className={"nav-logo"}>
            TaskBoard
          </Link>

          <div className={"nav-links"}>
            <Link to={"/pricing"} className={"nav-link"}>
              Pricing
            </Link>

            <Show when="signed-out">
              <Link to={"/sign-in"} className={"nav-link"}>
                Sign In
              </Link>

              <Link to={"sign-up"} className={"btn btn-primary"}>
                Sign Up
              </Link>
            </Show>

            <Show when="signed-in">
              <OrganizationSwitcher
                hidePersonal
                afterCreateOrganizationUrl={"dashboard"}
                afterSelectOrganizationUrl={"dashboard"}
                createOrganizationMode={"modal"}
                appearance={{
                  elements: {
                    userPreviewMainIdentifierText__personalWorkspace: {
                      color: "white",
                    },
                    organizationPreviewMainIdentifier__organizationSwitcherTrigger:
                      { color: "white" },
                  },
                }}
              />
              {organization && (
                <Link to={"/dashboard"} className={"nav-link"}>
                  Dashboard
                </Link>
              )}
              <UserButton />
            </Show>
          </div>
        </div>
      </div>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
