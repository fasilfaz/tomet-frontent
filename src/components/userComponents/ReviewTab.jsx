import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { postReview } from "@/redux/features/products/productSlice"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm, Controller } from "react-hook-form"
import toast from "react-hot-toast"
import { AiOutlineStar } from "react-icons/ai"
import { FaStar } from "react-icons/fa"
import Rating from "react-rating"
import { useDispatch, useSelector } from "react-redux"
import * as yup from "yup";
import { ScrollArea } from "../ui/scroll-area"
import moment from "moment"

const schema = yup.object().shape({
  review: yup.string().required("Review is required").min(5, "Review must be at least 5 characters long"),
  rating: yup.number().required("Rating is required").min(1, "Rating is required"),
});

export const ReviewTab = ({ productId, product }) => {
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: yupResolver(schema),
  });
  const isLoading = useSelector(state => state.product.isLoading);
  const dispatch = useDispatch();
  const onSubmit = data => {
    const datas = {
      rating: data.rating,
      comment: data.review,
      id: productId
    }
    dispatch(postReview(datas))
      .unwrap()
      .then(res => toast.success(res.message, { duration: 1000 }))
      .catch(err => toast.error(err, { duration: 1000 }))
  };

  return (
    <Tabs defaultValue="account" className="flex flex-col md:flex-row w-full">
      <TabsList className="flex md:flex-col w-full md:w-1/4 xl:w-1/6">
        <TabsTrigger value="account" className="text-lg">Write your review</TabsTrigger>
        <TabsTrigger value="password" className="text-lg">View all reviews</TabsTrigger>
      </TabsList>
      <TabsContent value="account" className="flex-1 w-full">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader>
              <CardTitle>Write review</CardTitle>
              <CardDescription>
                Share your experience with us. Click save when you're done.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="space-y-1 flex items-center gap-5">
                <Label htmlFor="rating">Rating</Label>
                <Controller
                  name="rating"
                  control={control}
                  render={({ field }) => (
                    <Rating
                      initialRating={field.value}
                      emptySymbol={<AiOutlineStar className="icon" />}
                      fullSymbol={<FaStar className="icon text-orange-500" />}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
              {errors.rating && <p className="text-red-500">{errors.rating.message}</p>}
              <div className="space-y-1 flex items-center gap-4">
                <Label htmlFor="review">Review</Label>
                <Input
                  id="review"
                  placeholder="Your review"
                  {...register('review')}
                />
              </div>
              {errors.review && <p className="text-red-500">{errors.review.message}</p>}
            </CardContent>
            <CardFooter>
              {isLoading ? (<Button className="w-full" type="button">Save review
                <span className='animate-pulse'>.</span>
                <span className='animate-pulse'>.</span>
                <span className='animate-pulse'>.</span>
              </Button>)
                : (<Button className="w-full" type="submit">Save review </Button>)}
            </CardFooter>
          </Card>
        </form>
      </TabsContent>
      <TabsContent value="password" className="flex-1 w-full">
        <Card>
          <CardHeader>
            <CardTitle>All reviews</CardTitle>
            <CardDescription>
              Read all the reviews from other users.
            </CardDescription>
          </CardHeader>
          {product?.reviews?.length > 0 ? (
            <ScrollArea className="w-full h-[15rem]" >
              {product.reviews.map((review) => (
                <CardContent key={review?._id} className="space-y-2 bg-zinc-100 rounded-md py-2 dark:bg-zinc-900 m-5">
                  <div>
                    <div className="flex gap-5 items-center justify-between">
                      <div className="flex gap-5">
                        <img src={review?.user?.avatar?.url} className="w-10 h-10 rounded-full" alt={review?.user?.firstName} />
                        <div className="grid ">
                          <h6 className="capitalize font-medium">{review?.user?.firstName} {review?.user?.lastName}</h6>
                          <div className="flex items-center">
                            <Rating
                              initialRating={review?.rating}
                              emptySymbol={<AiOutlineStar className="icon" />}
                              fullSymbol={<FaStar className="icon text-orange-500" />}
                              readonly
                            />
                          </div>
                        </div>
                      </div>
                      <div className="sm:flex hidden text-sm">
                          {moment(review?.createAt).format("DD-MM-YYYY")}
                        </div>
                    </div>

                    <p className="ps-[3.6rem] text-justify ">{review.comment}</p>
                  </div>
                </CardContent>
              ))}
            </ScrollArea>
          ) : (
            <CardContent className="space-y-2">
              <p>No reviews yet.</p>
            </CardContent>
          )}
        </Card>
      </TabsContent>
    </Tabs>
  )
}
