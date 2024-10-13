import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ScrollArea } from '../ui/scroll-area'
import { Textarea } from '../ui/textarea'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories } from '@/redux/features/categories/CategoriesSlice';
import { createProduct } from '@/redux/features/products/productSlice';

const AddProductDialog = () => {
  // validations using yup
  const productSchema = yup.object({
    name: yup.string().required('Name is required'),
    description: yup.string().required('Description is required'),
    price: yup.number().required('Price is required').integer().positive(),
    brand: yup.string().required('Brand is required'),
    quantity: yup.number().required('Quantity is required').integer().positive(),
    category: yup.string().required('Category is required'),
    images: yup
    .mixed()
    .required('Images are required')
    .test('fileSize', '4 images are required', (value) => value && value.length === 4)
  });

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(productSchema)
  });
  const [categories, setCategories] = useState(null);
  const [open, setOpen] = useState(false);
  const loading = useSelector(state => state.product.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getCategories())
      .unwrap()
      .then(res => setCategories(res.data))
      .catch(err => console.log(err))
  }, [])

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('price', data.price);
    formData.append('brand', data.brand);
    formData.append('quantity', data.quantity);
    formData.append('category', data.category);
    Array.from(data.images).forEach((image) => {
      formData.append('images', image);
    });

    dispatch(createProduct(formData))
    .unwrap()
    .then(res => {
      reset();
      toast.success(res.message, { duration: 1000 });
      setOpen(false);
    })
    .catch(err => toast.error(err))
  };
  
  return (
    <Dialog  open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpen(true)}>Add</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Add Product</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-[50vh] w-full rounded-md border">
          <div className='px-4'>
            <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
              <div className="grid gap-4">
                <Label htmlFor="name">
                  Name
                </Label>
                <Input
                  id="name"
                  placeholder="Name"
                  className="col-span-3"
                  {...register('name')}
                />
                {errors?.name && <p className='text-red-500'>{errors.name.message}</p>}
              </div>
              <div className="grid gap-4">
                <Label htmlFor="description">
                  Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Description"
                  className="col-span-3"
                  {...register("description")}
                />
                {errors?.description && <p className='text-red-500'>{errors.description.message}</p>}
              </div>
              <div className="grid gap-4">
                <Label htmlFor="brand">
                  Brand
                </Label>
                <Input
                  id="brand"
                  placeholder="Brand Name"
                  className="col-span-3"
                  {...register("brand")}
                />
                {errors?.brand && <p className='text-red-500'>{errors.brand.message}</p>}
              </div>
              <div className="grid gap-4">
                <Label htmlFor="category">
                  Category
                </Label>
                <Controller
                control={control}
                name="category"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {categories?.map(category => 
                        <SelectItem key={category._id} value={category._id}>{category.name}</SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
                {errors?.category && <p className="text-red-500">{errors?.category.message}</p>}
              </div>
              <div className="grid gap-4">
                <Label htmlFor="price">
                  Price
                </Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="Price"
                  className="col-span-3"
                  {...register('price')}
                />
                {errors?.price && <p className='text-red-500'>{errors.price.message}</p>}
              </div>
              <div className="grid gap-4">
                <Label htmlFor="quantity">
                  Quantity
                </Label>
                <Input
                  id="quantity"
                  type="number"
                  placeholder="Quantity"
                  className="col-span-3"
                  {...register("quantity")}
                />
                {errors?.quantity && <p className='text-red-500'>{errors.quantity.message}</p>}
              </div>
              <div className="grid gap-4">
                <Label htmlFor="images">
                  Images
                </Label>
                <Input
                  id="images"
                  type="file"
                  className="col-span-3"
                  {...register('images')}
                  multiple
                />
                {errors?.images && <p className="text-red-500">{errors?.images.message}</p>}
              </div>
              <div className="grid gap-4">
                {loading ? (<Button type="button">Adding product ...</Button>) : (<Button type="submit">Add Product</Button>)}
              </div>
            </form>
          </div>
        </ScrollArea>

      </DialogContent>
    </Dialog>
  )
}

export default AddProductDialog