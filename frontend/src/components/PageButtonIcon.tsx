import { ChevronRight } from "lucide-react"
import { ChevronLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../modules";
import { addPage } from '@/modules/pageModule';
import { subPage } from '@/modules/pageModule';

export function PageButtonIcon() {
  const dispatch = useDispatch();
  const page : number = useSelector( (state: RootState) => state.pageReducer.page );

  return (
    <div className="flex items-center justify-center">
      <Button variant="outline" size="icon">
        <div onClick={() => dispatch(subPage())}>
          <ChevronLeft className="h-4 w-4 button-icon" />
        </div>
      </Button>
      <Button variant="outline" size="icon">
        {page}
      </Button>
      <Button variant="outline" size="icon">
        <div onClick={() => dispatch(addPage())}>
          <ChevronRight className="h-4 w-4 button-icon" />
        </div>
      </Button>
    </div>
  )
}
