import "./Sidebar.css";
import { Twitter } from "@mui/icons-material";
import SidebarOption from "./SidebarOption";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import { Button } from "@mui/material";
import {
  NotificationsOutlined as NotificationIcon,
  MailOutlined as MessagesIcon,
  BookmarkBorderOutlined as BookmarksIcon,
  AccountCircleOutlined as ProfileIcon,
  MoreHorizOutlined as MoreIcon,
} from "@mui/icons-material";
import UserInfo from "./UserInfo";

const Sidebar = () => {
  return (
    <div className="Side-con">
      <div className="Sidebar">
        <div>
          <div className="sidebar__twitterIcon">
            <Twitter />
          </div>
          <SidebarOption Icon={HomeOutlinedIcon} text="Home" active />
          <SidebarOption Icon={ExploreOutlinedIcon} text="Explore" />
          <SidebarOption Icon={NotificationIcon} text="Notification" />
          <SidebarOption Icon={MessagesIcon} text="Messages" />
          <SidebarOption Icon={BookmarksIcon} text="Bookmarks" />
          <SidebarOption Icon={ProfileIcon} text="Profile" />
          <SidebarOption Icon={MoreIcon} text="More" />
          <Button variant="outlined" className="Sidebar__tweet" fullWidth>
            <span>Tweet</span>
          </Button>
        </div>
        <UserInfo />
      </div>
    </div>
  );
};

export default Sidebar;
