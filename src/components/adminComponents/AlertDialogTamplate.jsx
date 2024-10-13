import React, { useState } from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { deleteUserById } from '@/redux/features/users/userSlice';
import { deleteProductById } from '@/redux/features/products/productSlice';

const AlertDialogTamplate = ({id, btnText, qn, description, action, textColor, path}) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  
  const handleDelete = () => {
    setOpen(false);
    if(path === "user") {
      dispatch(deleteUserById({path, id}))
      .unwrap()
      .then(res => toast.success(res.message, { duration: 1000 }))
      .catch(err => toast.error(err, { duration: 1000 }));
    } else if (path === "product") {
      dispatch(deleteProductById({path, id}))
      .unwrap()
      .then(res => toast.success(res.message, { duration: 1000 }))
      .catch(err => toast.error(err, { duration: 1000 }));
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger className={`${textColor} w-full`}>{btnText}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{qn}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>{action}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default AlertDialogTamplate;
