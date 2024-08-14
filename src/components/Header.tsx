import useOpen from "../hooks/useOpen";
import { RiFullscreenFill, RiCloseLargeLine } from "react-icons/ri";

const Header = () => {
  const { open, setOpen } = useOpen();

  return (
    <div className="flex items-center justify-between p-4">
      <p className="text-lg">GenAIon</p>
      <div className="flex gap-4">
        <RiFullscreenFill className="cursor-pointer" />
        <RiCloseLargeLine className="cursor-pointer" onClick={() => setOpen(!open)} />
      </div>
    </div>
  );
};

export default Header;
