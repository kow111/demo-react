import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";
import {
  FaTachometerAlt,
  FaGithub,
  FaRegLaughWink,
  FaReact,
} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";
import sidebarBg from "../../assets/bg2.jpg";
import { Link, useNavigate } from "react-router-dom";
import "./SideBar.scss";
const SideBar = ({ image, collapsed, toggled, handleToggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <FaReact size={"3em"} color="cyan" />
            <span onClick={() => navigate("/")}>Title</span>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem icon={<FaTachometerAlt />}>
              Dashboard
              <Link to="/admin" />
            </MenuItem>
            <SubMenu title="Features" icon={<FaRegLaughWink />}>
              <MenuItem>
                {" "}
                Quản lý User
                <Link to="/admin/manage-users" />
              </MenuItem>
              <MenuItem>
                {" "}
                Quản lý Quiz <Link to="/admin/manage-quizs" />
              </MenuItem>
              <MenuItem> Quản lý Câu hỏi</MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/azouaoui-med/react-pro-sidebar"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                viewSource
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
      ;
    </>
  );
};
export default SideBar;
