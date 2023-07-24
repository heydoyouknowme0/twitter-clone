import "./SidebarOption.css";
import { SvgIconComponent } from "@mui/icons-material";
interface Prop {
  text?: string;
  Icon: SvgIconComponent;
  active?: boolean;
}
const SidebarOption = ({ active, text, Icon }: Prop) => {
  return (
    <div className={`SidebarOption ${active && "SidebarOption--active"}`}>
      <Icon />
      {text && <h2>{text}</h2>}
    </div>
  );
};

export default SidebarOption;
