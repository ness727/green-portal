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

    const goToImage = (link : string) => {
        window.open(link, "_blank", "noopener,noreferrer");
      }

    return (
        <div className="flex flex-wrap justify-center items-start">
            {images && images.map((item) => (
                <Card key={item.link} className="my-card sm:w-full md:w-1/3 lg:w-1/4 mx-4">
                    <div onClick={() => goToImage(item.link)}>
                        <CardHeader>
                            <div className="w-full h-64 overflow-hidden">
                                <img src={item.thumbnail} className="w-full h-full object-cover"/>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div style={{minHeight: '6rem'}} dangerouslySetInnerHTML={{ __html: item.title }}></div>
                        </CardContent>
                    </div>
                </Card>
            ))}
        </div>
    )
}
export default ImageCard;