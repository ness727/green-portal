import { News } from "@/main";
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

const NewsCard = () =>{
    const news : News[] = useSelector( (state: RootState) => state.newsReducer.data );

    const goToNews = (link : string) => {
        window.open(link, "_blank", "noopener,noreferrer");
      }

    return (
        <div>
            {news && news.map((item) => (
                <Card key={item.originallink} className="my-card">
                    <div onClick={() => goToNews(item.originallink)}>
                        <CardHeader>
                            <CardTitle><div dangerouslySetInnerHTML={{ __html: item.title }}></div></CardTitle>
                            <CardDescription></CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <p>{item.pubDate}</p>
                        </CardFooter>
                    </div>
                </Card>
            ))}
        </div>
    )
}
export default NewsCard;