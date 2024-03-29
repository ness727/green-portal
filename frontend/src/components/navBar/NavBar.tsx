import { ModeToggle } from "./ModeToggle";
import PapagoModal from "./PapagoModal";

export default function NavBar() {
    return (
        <div className="flex justify-end py-5 my-toggle">
          <PapagoModal />
          <ModeToggle />
        </div>
    );
}