import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
    Dialog,
    DialogContent,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from '../ui/button';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCategoryById, updateCategoryById } from '@/redux/features/categories/CategoriesSlice';

const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(3).max(20)
});

const CategoryDialog = ({ categoryId, name }) => {
    const [open, setOpen] = useState(false);
    const loading = useSelector(state => state.category.isLoading);
    const dispatch = useDispatch();

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            name: name
        }
    });
    const watchedName = watch('name', name);

    const onSubmit = (data) => {
        dispatch(updateCategoryById({data, id: categoryId}))
        .unwrap()
        .then(res => {
            toast.success(res.message, {duration: 1000});
            setOpen(false);
        })
        .catch(err => toast.error(err, {duration: 1000}))
    }

    const handleDelete = () => {
        dispatch(deleteCategoryById(categoryId))
        .unwrap()
        .then(res => {
            toast.success(res.message, { duration: 1000 });
            setOpen(false);
        })
        .catch(err => toast.error(err, { duration: 2500 }))
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className='border border-orange-500 hover:bg-orange-500 hover:text-white text-orange-500 bg-transparent p-5 cursor-pointer shadow-sm transition duration-300 hover:scale-110 ease-in-out'>
                    <h1 className='capitalize'>{name}</h1>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
                    <div className="grid gap-4">
                        <Label htmlFor="name">
                            Name
                        </Label>
                        <Input
                            id="name"
                            value={watchedName}
                            className="col-span-3 capitalize"
                            {...register("name")}
                        />
                        {errors?.name && <p className='text-red-500'>{errors.name.message}</p>}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        {loading ? (
                            <Button type="button">
                                Updating
                                <span className='animate-pulse'>.</span>
                                <span className='animate-pulse'>.</span>
                                <span className='animate-pulse'>.</span>
                            </Button>
                        ) : (
                            <Button type="submit">
                                Update
                            </Button>
                        )}
                        <Button type="button" onClick={handleDelete}>
                            Delete
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default CategoryDialog;
