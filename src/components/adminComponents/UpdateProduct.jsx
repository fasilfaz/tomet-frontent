import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from '../ui/textarea';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { getCategories } from '@/redux/features/categories/CategoriesSlice';
import { updateProduct } from '@/redux/features/products/productSlice';

const UpdateProduct = ({ product, id }) => {
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
      .test('required', '4 images are required', (value) => !photos || (photos && value && value.length === 4))
  });

  const [categories, setCategories] = useState([]);
  const [photos, setPhotos] = useState(null);
  const navigate = useNavigate();
  const role = useSelector(state => state.users.user.userInfo.role);
  
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({
    resolver: yupResolver(productSchema),
    defaultValues: {
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || '',
      brand: product?.brand || '',
      quantity: product?.quantity || '',
      category: product?.category?._id || '',
    }
  });

  const loading = useSelector(state => state.product.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories())
      .unwrap()
      .then(res => setCategories(res.data))
      .catch(err => console.log(err));
  }, [dispatch]);

  useEffect(() => {
    reset({
      name: product?.name || '',
      description: product?.description || '',
      price: product?.price || '',
      brand: product?.brand || '',
      quantity: product?.quantity || '',
      category: product?.category?._id || '',
    });
  }, [product, reset]);

  const onSubmit = (data) => {
    // console.log(data);
    dispatch(updateProduct({
      data,
      id
    }))
    .unwrap()
    .then(res => {
      toast.success(res.message, 1000);
      setTimeout(() => {
        if(role === 'admin') {
          navigate('/admin/products');
        } else if (role === "seller") {
          navigate('/seller/products');
        }
      }, 1000);
    })
    .catch(err => toast.error(err.message, {duration: 1000}));
  };

  const handlePhoto = (e) => {
    if (e.target.files.length === 4) {
      setPhotos(e.target.files);
    }
  };

  return (
    <div className='w-full container h-full overflow-x-hidden'>
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
        <div className="grid gap-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Name"
            className="col-span-3"
            {...register('name')}
          />
          {errors?.name && <p className='text-red-500'>{errors.name.message}</p>}
        </div>

        <div className="grid gap-4">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Description"
            className="col-span-3"
            {...register("description")}
          />
          {errors?.description && <p className='text-red-500'>{errors.description.message}</p>}
        </div>

        <div className="grid gap-4">
          <Label htmlFor="brand">Brand</Label>
          <Input
            id="brand"
            placeholder="Brand Name"
            className="col-span-3"
            {...register("brand")}
          />
          {errors?.brand && <p className='text-red-500'>{errors.brand.message}</p>}
        </div>

        <div className="grid gap-4">
          <Label htmlFor="category">Category</Label>
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
                    {categories?.map(category => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          />
          {errors?.category && <p className="text-red-500">{errors?.category.message}</p>}
        </div>

        <div className="grid gap-4">
          <Label htmlFor="price">Price</Label>
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
          <Label htmlFor="quantity">Quantity</Label>
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
          <Label className="btn">{product?.images[0]?.url ? "Update Images" : "Upload Image"}</Label>
          <Input
            id="images"
            type="file"
            className="col-span-3"
            {...register('images')}
            onChange={handlePhoto}
            multiple={true}
            hidden
          />
          {photos ? (
            <div className='flex justify-between items-center gap-5 flex-wrap'>
              {Array.from(photos).map((img, index) => (
                <img key={index} src={URL.createObjectURL(img)} alt={`Preview ${index}`} className="w-16 h-16" />
              ))}
            </div>
          ) : (
            <div className='flex justify-between items-center gap-5 flex-wrap'>
              {product?.images?.map((img, index) => (
                <img key={index} src={img.url} alt={img.name} className="w-16 h-16" />
              ))}
            </div>
          )}
        </div>

        {errors?.images && <p className="text-red-500">{errors?.images.message}</p>}

        <div className="grid gap-4">
          {loading ? (
            <Button type="button">Updating product ...</Button>
          ) : (
            <Button type="submit">Update Product</Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UpdateProduct;
