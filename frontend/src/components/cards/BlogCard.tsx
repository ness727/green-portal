import { Blog } from "@/main";
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

const BlogCard = () =>{
    const blog : Blog[] = useSelector( (state: RootState) => state.blogReducer.data );

    const goToBlog = (link : string) => {
        window.open(link, "_blank", "noopener,noreferrer");
      }

    return (
        <div className="sm:w-3/4">
            {blog && blog.map((item) => (
                <Card key={item.link} className="my-card">
                    <div onClick={() => goToBlog(item.link)}>
                        <CardHeader>
                            <CardTitle><div dangerouslySetInnerHTML={{ __html: item.title }}></div></CardTitle>
                            <CardDescription>{item.bloggername}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div dangerouslySetInnerHTML={{ __html: item.description }}></div>
                        </CardContent>
                        <CardFooter className="flex justify-end">
                            <p>{item.postdate}</p>
                        </CardFooter>
                    </div>
                </Card>
            ))}
        </div>
    )
}
export default BlogCard;