import { Image } from "@/main";
import { RootState } from "@/modules";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import { useDispatch, useSelector } from "react-redux";

const ImageCard = () =>{
    const images : Image[] = useSelector( (state: RootState) => state.imageReducer.data );

    const goToImageSite = (link : string) => {
        window.open(link, "_blank", "noopener,noreferrer");
      }

    return (
        <div className="flex flex-wrap justify-center">
            {images && images.map((item) => (
                <Card key={item.link} className="my-card w-1/5 mx-4">
                    <div onClick={() => goToImageSite(item.link)}>
                        <CardHeader>
                            <img src={item.thumbnail} />
                        </CardHeader>
                        <CardContent>
                        <div dangerouslySetInnerHTML={{ __html: item.title }}></div>
                        </CardContent>
                    </div>
                </Card>
            ))}
        </div>
    )
}
export default ImageCard;