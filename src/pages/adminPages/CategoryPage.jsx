import React, { useEffect, useState } from 'react';
import CategoryDialog from '../../components/adminComponents/CategoryDialog';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { createCategory, getCategories } from '@/redux/features/categories/CategoriesSlice';
import BreadCrumbTwo from '@/components/userComponents/BeadCrumTwo';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

const schema = yup.object({
    name: yup.string().min(3).max(20).required()
})

const CategoryCard = () => {
    const [categories, setCategories] = useState(null);
    const loading = useSelector(state => state.category.isLoading);
    // console.log('categories', loading)
    const dispatch = useDispatch();
    const role = useSelector(state => state.users.user.userInfo.role);

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema)
    });

    useEffect(() => {
        dispatch(getCategories())
        .unwrap()
        .then(res => setCategories(res.data))
        .catch(err => console.log(err))
    }, [categories]);

    const onSubmit = (data) => {
        dispatch(createCategory(data))
        .unwrap()
        .then(res => {
            reset();
            toast.success(res.message, { duration: 1000 })
        })
        .catch(err => toast.error(err, { duration: 1000}))
    }

    return (
        <section className='container lg:py-5 py-10 grid'>
            <Toaster />
            <article className='flex justify-start'>
                {role === 'admin' ?
                <BreadCrumbTwo href={"/admin/dashboard"} page1={"Dashboard"} page2={"Products"} color={"text-black dark:text-white"} />
            : <BreadCrumbTwo href={"/seller/dashboard"} page1={"Dashboard"} page2={"Products"} color={"text-black dark:text-white"} />}
            </article>
            <article className='grid py-5 gap-4'>
                <h1 className='font-semibold text-xl sm:text-4xl'>Manage Categories</h1>
                <form onSubmit={handleSubmit(onSubmit)} className='grid gap-5'>
                    <div className='grid gap-4'>
                        <Label htmlFor='name' className='text-gray-700 dark:text-gray-100'>Name</Label>
                        <Input
                            type='text'
                            name='name'
                            id='name'
                            {...register("name")}
                            className="border-orange-500 focus:border-0 min-w-7"
                        />
                        {errors?.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="w-64">
                        {loading ? (
                            <Button type="button">
                                Adding
                                <span className='animate-pulse'>.</span>
                                <span className='animate-pulse'>.</span>
                                <span className='animate-pulse'>.</span>
                            </Button>
                        ) : (
                            <Button type="submit">
                                Add Category
                            </Button>
                        )}
                    </div>
                </form>
            </article>
            <article className='flex gap-5 flex-wrap min-w-52 w-full'>
                {categories?.map(category => (
                    <CategoryDialog key={category._id} categoryId={category._id} name={category.name} /> // passing categoryId
                ))}
            </article>
        </section>
    )
}

export default CategoryCard;
